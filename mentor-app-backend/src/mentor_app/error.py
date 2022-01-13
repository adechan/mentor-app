class NotAuthenticated(Exception):
    pass

class ServerError(Exception):
    pass

class InvalidLogin(ServerError):
    pass

class InvalidFileType(ServerError):
    pass