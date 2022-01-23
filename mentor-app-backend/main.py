import magic

from mentor_app import MentorServer
from loguru import logger
import crawler

server = MentorServer()
@server.app.route('/')
def hello():
    return 'Hello!'

# def create_course_table(db, api):
#     courses = [
#         api.Course(course_id=0, title="Math"),
#         api.Course(course_id=1, title="Piano"),
#         api.Course(course_id=2, title="Guitar"),
#     ]
#
#     for course in courses:
#         db.session.add(course)
#
#     db.session.commit()
#     logger.debug(f'Course {courses} commited')


# server.db.create_all()
# create_course_table(server.db, server.api)
# crawler.populate_course_table(server.db, server.api)
# server.serve()

