import uuid
import jwt
from datetime import datetime

class WebSession:
    def __init__(self, secret: str, creation: datetime = datetime.now(), algorithm: str = 'HS256'):
        self._secret = secret
        self._algorithm = algorithm
        self._creation = creation
        self._last_use = datetime.now()
        self._id = uuid.uuid4()

    @property
    def data(self):
        return dict(id=self._id, creation=self._creation, last_use=self._last_use)

    def cookie(self) -> str:
        return jwt.encode(self.data, secret=self._secret, algorithm=self._algorithm)