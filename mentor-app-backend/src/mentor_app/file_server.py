import os

import magic
from flask import send_from_directory
from loguru import logger

from mentor_app.error import InvalidFileType

def upload_file(filename: str, upload_folder='./avatars'):
    return send_from_directory(directory=upload_folder, path=filename)

def save_file(data: bytes, upload_folder='./avatars') -> str:
    file_type = magic.from_buffer(data, mime=True)
    logger.debug(f'{file_type=}')

    mime_map = {
        'image/jpeg': '.jpg',
        'image/png': '.png'
    }

    if file_type not in mime_map:
        raise InvalidFileType
    name = f'{os.urandom(20).hex()}' + mime_map[file_type]
    path = os.path.join(upload_folder, name)
    with open(path, 'wb') as f:
        f.write(data)
    return name
