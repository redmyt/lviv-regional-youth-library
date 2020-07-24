class AnnouncementGoogleMyBusinessServiceError(BaseException):
    message = ""

    def __str__(self):
        return f"{self.message} Arguments: {self.args}"


class AnnouncementLocationPostDoesNotExist(AnnouncementGoogleMyBusinessServiceError):
    message = "AnnouncementGoogleMyBusinessLocationPost object does not exist."
