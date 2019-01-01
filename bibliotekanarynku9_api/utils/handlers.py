"""
Module that contains various data and functionality handlers
for the project.
"""

import base64
import binascii
import hashlib
import os
import redis
from redis.exceptions import DataError, ResponseError
from django.conf import settings
from utils.logger import LOGGER


IMG_HANDLER_ALGORITHM = 'shake_256'
IMG_HANDLER_NAME_LENGTH = 8
IMG_HANDLER_DIST = settings.MEDIA_ROOT

USER_SESSION_ALGORITHM = 'shake_128'
USER_SESSION_ID_LENGTH = 4

REDIS_HANDLER_PASSWORD = settings.REDIS_PASSWORD

class ImageHandler:
    """Handler for saving and removing the decoded images to filesystem."""

    def __init__(self, dist=IMG_HANDLER_DIST, algorithm=IMG_HANDLER_ALGORITHM):
        self.hashlib = hashlib.new(algorithm)
        self.dist = dist

    def encode_input(self, decoded_data):
        """Encode the raw client data."""

        try:
            return decoded_data.encode()
        except UnicodeEncodeError as err:
            LOGGER.error(f'{self.__class__.__name__} encode error: {err}')

    def compose_name(self, encoded_data):
        """Create hash unique name for image."""

        self.hashlib.update(encoded_data)
        return self.hashlib.hexdigest(IMG_HANDLER_NAME_LENGTH)

    def save_image(self, encoded_data, img_name):
        """Save image in the server filesystem."""

        path = os.path.join(self.dist, img_name)
        try:
            with open(path, 'wb') as img:
                img.write(base64.b64decode(encoded_data, validate=True))
                return path
        except (IOError, binascii.Error) as err:
            os.remove(path)
            LOGGER.error(f'I/O {self.__class__.__name__} error: {err}')

    def parse(self, decoded_data):
        """Collective handler method."""

        if not decoded_data:
            return False

        encoded_data = self.encode_input(decoded_data)
        if not encoded_data:
            return False

        img_name = self.compose_name(encoded_data)
        return self.save_image(encoded_data, img_name)

    @staticmethod
    def remove_image(path):
        """Remove file from server filesystem"""

        if not os.path.isfile(path):
            LOGGER.error(f'File with path: {path} not found for delete.')
            return False

        os.remove(path)
        return True


class UserSessionHandler:
    """Handler for creating the session id base of user database table id."""

    def __init__(self, algorithm=USER_SESSION_ALGORITHM):
        self.hashlib = hashlib.new(algorithm)

    @staticmethod
    def encode_user_id(user_id):
        """Encode the accepted numeric user id."""

        return str(user_id).encode()

    def hash_user_id(self, user_id):
        """Create the unique hash representation of user id."""

        encoded_id = self.encode_user_id(user_id)
        self.hashlib.update(encoded_id)
        return self.hashlib.hexdigest(USER_SESSION_ID_LENGTH)


class RedisHandler:
    """Handler that provides API for redis db interaction."""

    instance = None
    redis = redis.Redis(password=REDIS_HANDLER_PASSWORD)

    def __new__(cls):
        if cls.instance is None:
            cls.instance = super(RedisHandler, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.types_setter_map = {
            (int, float, complex, str, bytes): self.primitive_type_setter,
            (set,): self.set_type_setter
        }

    def primitive_type_setter(self, key, value):
        """Function for set the primitive value to redis."""

        self.redis.set(key, value)

    def set_type_setter(self, key, value):
        """Function for set the set type value to redis."""

        for item in value:
            self.redis.sadd(key, item)

    def get_setter(self, value):
        """
        Function gets the appropriate setter method according
        to accepted value's type.
        """

        for types, setter in self.types_setter_map.items():
            value_type = type(value)
            if value_type in types:
                return setter
        return self.primitive_type_setter

    def set_value(self, key, value):
        """Function that sets records to redis db."""

        setter = self.get_setter(value)
        try:
            setter(key, value)
            return True
        except (DataError, ResponseError):
            LOGGER.error(
                f'Error during saving record to redis. Unexpected key '
                f'or value type was accepted - (key: {key}; value: {value})'
            )

    def get_value(self, key):
        """Function that gets primitive record from redis db."""

        try:
            return self.redis.get(key)
        except (DataError, ResponseError):
            LOGGER.error(
                f'Error during getting primitive record from redis.'
                f'Unexpected key type was accepted - (key: {key})'
            )

    def get_set(self, key):
        """Function that gets set records from redis db."""

        try:
            return self.redis.smembers(key)
        except (DataError, ResponseError):
            LOGGER.error(
                f'Error during getting set record from redis.'
                f'Unexpected key type was accepted - (key: {key})'
            )

    def remove_value(self, key):
        """Function that removes record from redis db."""

        try:
            self.redis.delete(key)
            return True
        except DataError:
            LOGGER.error(
                f'Error during deleting record from redis.'
                f'Unexpected key type was accepted - (key: {key})'
            )


IMAGE_HANDLER = ImageHandler()
USER_SESSION_HANDLER = UserSessionHandler()
REDIS_HANDLER = RedisHandler()
