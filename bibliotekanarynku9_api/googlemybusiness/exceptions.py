class GoogleMyBusinessServiceError(BaseException):
    message = ""

    def __str__(self):
        return f"{self.message} Arguments: {self.args}"


class GoogleMyBusinessServiceConnectionError(GoogleMyBusinessServiceError):
    message = "Google My Business service does not connect."


class GoogleMyBusinessServerError(GoogleMyBusinessServiceError):
    message = "Google My Business server response incorrect."


class GoogleMyBusinessParsingError(GoogleMyBusinessServiceError):
    message = "Error during the parsing of Google My Business server response."


class GoogleMyBusinessAccountDoesNotExist(GoogleMyBusinessServiceError):
    message = "GoogleMyBusinessAccount object does not exist."


class GoogleMyBusinessAccountIntegrityError(GoogleMyBusinessServiceError):
    message = "Error during the saving Google Business account info to database."
