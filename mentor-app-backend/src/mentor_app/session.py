import jwt
import json
import datetime
from loguru import logger
from mentor_app.error import NotAuthenticated

# class DateTimeEncoder(json.JSONEncoder):
#     def default(self, z):
#         if isinstance(z, datetime.datetime):
#             return str(z)
#         else:
#             return super().default(z)

class WebSession:
    ALGORITHM: str = 'HS256'
    SECRET: str = 'uBFlN5yqbJUZnFRWvMCyUZxJ24LtYlN7vNYe1v6Mam'

    def __init__(self, data: dict):
        self._id = None
        self._creation = None
        self._last_use = None
        self._account_id = None
        self._decode_jwt(data)

    def _decode_jwt(self, data: dict):
        try:
            self._id = data['id']
            self._creation = data['creation']
            self._last_use = data['last_use']
            self._account_id = data['account_id']
        except KeyError as e:
            logger.exception(e)
            raise NotAuthenticated('Invalid token!')

    def cookie(self) -> str:
        data = dict(id=self._id, creation=self._creation, last_use=self._last_use, account_id=self._account_id)
        return jwt.encode(data, secret=WebSession.SECRET, algorithm=WebSession.ALGORITHM)

    def __str__(self):
        return self.cookie()

def decode_session(token: str) -> WebSession:
    return WebSession(data=jwt.decode(token, key=WebSession.SECRET, algorithms=[WebSession.ALGORITHM]))

def verify_session_cookie(cookies) -> WebSession:
    if 'session' not in cookies:
        raise NotAuthenticated('Must be authenticated!')

    try:
        return decode_session(cookies['session'])
    except jwt.exceptions.PyJWTError as e:
        logger.exception(e)
        raise NotAuthenticated('Invalid token!')