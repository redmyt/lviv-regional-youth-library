class ImagesHandlerError(BaseException):
    message = ""

    def __str__(self):
        return f"{self.message}"


class ImageDecodingError(ImagesHandlerError):
    message = "Cannot decode image. Invalid image data."


class ImageValidateError(ImagesHandlerError):
    message = "Image data is not valid."


class ImageDeletionError(ImagesHandlerError):
    message = "Failed to remove image. File does not exist."
