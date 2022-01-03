import os
import flask
from datetime import timedelta, datetime

def new_session(account_id: int, email: str):
    session_id = os.urandom(32).hex()
    flask.session['id'] = session_id
    flask.session['email'] = email
    flask.session['account_id'] = account_id
    flask.session['creation'] = str(datetime.now())
    flask.session['duration'] = timedelta(hours=4).seconds
    return session_id
