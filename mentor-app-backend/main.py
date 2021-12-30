from mentor_app import MentorServer
from loguru import logger

server = MentorServer()
@server.app.route('/')
def hello():
    return 'Hello!'

def create_db(db, api):
    db.create_all()
    account = api.Account(
        account_id=0, mentor_id=None, student_id=None,
        first_name='Big', last_name='Horse',
        email='man@man.com', password='hi'
    )

    db.session.add(account)
    db.session.commit()
    logger.debug(f'Account {account} committed')

def create_course_table(db, api):
    db.create_all()
    courses = [
        api.Course(course_id=0, title="Math"),
        api.Course(course_id=1, title="Piano"),
        api.Course(course_id=2, title="Guitar"),
    ]

    for course in courses:
        db.session.add(course)

    db.session.commit()
    logger.debug(f'Course {courses} commited')


# server.db.create_all()
# create_course_table(server.db, server.api)
# create_db(server.db, server.api)
server.serve()
