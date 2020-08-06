"""Module that contains various data Handlerss for the project."""

import base64
import binascii
import uuid
import os

from io import BytesIO
from PIL import Image, UnidentifiedImageError
from django.conf import settings

from utils.handlers.images.exceptions import (
    ImageDecodingError,
    ImageDeletionError,
    ImageValidateError,
)
from utils.logger import LOGGER


# TODO: Provide more general solution
IMG_PUBLIC_HOST = "http://bibliotekanarynku.com"

IMG_DIST = settings.MEDIA_ROOT
TRASH_PATH = os.devnull
DEFAULT_COMPRESS_SIZE = (900, 900)
DEFAULT_COMPRESS_QUALITY = 60
PNG = "PNG"
PNG_COMPRESS_MODE = "P"


class ImagesHandler:
    """Handler for saving and removing the decoded images to filesystem."""

    def validate_image(self, image: str) -> str:
        try:
            decoded_image: BytesIO = self._decode_image(image)
            self._verify_image(decoded_image)
            with Image.open(decoded_image) as img:
                img.save(TRASH_PATH, format=img.format)
                return image
        except (ImageDecodingError, UnidentifiedImageError, OSError) as err:
            LOGGER.error(f"Failed image validation. Exception: {err}")
            raise ImageValidateError

    def save_image(self, image: str) -> str:
        decoded_image: BytesIO = self._decode_image(image)
        img_path: str = self._generate_image_path()
        with Image.open(decoded_image) as img:
            img_name: str = f"{img_path}.{img.format}"
            img: Image = self._compress_image(img)
            img.save(img_name, progressive=True, optimize=True, quality=DEFAULT_COMPRESS_QUALITY)
            return img_name

    @staticmethod
    def remove_image(path: str) -> None:
        try:
            os.remove(path)
        except FileNotFoundError as err:
            LOGGER.error(f"Fail to remove the image. Exception: {err}")
            raise ImageDeletionError

    @staticmethod
    def get_public_image_path(image_path: str) -> str:
        """Cut the absolute image path and returns only public part."""
        pure_path_start: int = image_path.index(settings.STATIC_URL)
        return f"{IMG_PUBLIC_HOST}{image_path[pure_path_start:]}"

    @staticmethod
    def _compress_image(image: Image) -> Image:
        image.thumbnail(DEFAULT_COMPRESS_SIZE)
        if image.format == PNG:
            return image.convert(PNG_COMPRESS_MODE, palette=Image.ADAPTIVE)
        return image

    @staticmethod
    def _decode_image(image: str) -> BytesIO:
        try:
            return BytesIO(base64.b64decode(image))
        except (TypeError, binascii.Error) as err:
            LOGGER.error(f"Filed image decoding attempt. Exception: {err}")
            raise ImageDecodingError

    @staticmethod
    def _verify_image(image: BytesIO) -> None:
        with Image.open(image) as img:
            return img.verify()

    @staticmethod
    def _generate_image_path() -> str:
        return os.path.join(IMG_DIST, str(uuid.uuid4()))


IMAGES_HANDLER: ImagesHandler = ImagesHandler()
