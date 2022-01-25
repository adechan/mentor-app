import os

import trio
from mentor_app import MentorServer
import books_crawler.crawler

server = MentorServer()

# server.db.create_all()
# create_course_table(server.db, server.api)
# crawler.populate_course_table(server.db, server.api)
# server.serve()

# print(os.getcwd())
interests = books_crawler.get_interests_from_db(server.db, server.api)
trio.run(books_crawler.run_crawler, interests)
