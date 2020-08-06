"""Module that contains various data Handlerss for the project."""

import hashlib


USER_SESSION_ALGORITHM = 'shake_128'
USER_SESSION_ID_LENGTH = 4


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


USER_SESSION_HANDLER = UserSessionHandler()
