"""Module that contains various data parsers for the project."""

import base64
import binascii
import hashlib
import os
from django.conf import settings
from utils.logger import LOGGER


IMG_PARSER_ALGORITHM = 'shake_128'
IMG_PARSER_NAME_LENGTH = 8
IMG_PARSER_DIST = settings.MEDIA_ROOT


class ImageParser:
    """Parser for saving the decoded images to filesystem."""

    def __init__(self, dist=IMG_PARSER_DIST, algorithm=IMG_PARSER_ALGORITHM):
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
        return self.hashlib.hexdigest(IMG_PARSER_NAME_LENGTH)

    def save_image(self, encoded_data, img_name):
        """Save image in the server filesystem."""

        path = os.path.join(self.dist, img_name)
        try:
            with open(path, 'wb') as img:
                img.write(base64.b64decode(encoded_data, validate=True))
                return path
        except (IOError, binascii.Error) as err:
            LOGGER.error(f'I/O {self.__class__.__name__} error: {err}')

    def parse(self, decoded_data):
        """Collective parser method."""

        encoded_data = self.encode_input(decoded_data)
        if not encoded_data:
            return None

        img_name = self.compose_name(encoded_data)
        return self.save_image(encoded_data, img_name)
