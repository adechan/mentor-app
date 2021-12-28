from mentor_app import MentorServer
from loguru import logger

server = MentorServer()
@server.app.route('/')
def hello():
    return 'Hello!'

def create_db(db, api):
    db.create_all()
    account = api.Account(
        account_id=0, mentor_id=0, student_id=0,
        first_name='Big', last_name='Horse',
        email='man@man.com', password='hi'
    )

    db.session.add(account)
    db.session.commit()
    logger.debug(f'Account {account} committed')

# create_db(server.db, server.api)
server.serve()
