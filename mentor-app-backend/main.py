from recommender.recommend_item import recommend_book_to_users
from mentor_app import MentorServer

server = MentorServer()
server.serve()

# server.db.create_all()

# crawler.populate_course_table(server.db, server.api)


# CRAWL AND POPULATE COURSE TABLE
# create_course_table(server.db, server.api)

# CRAWL INTERESTS AND STORE THEM IN A FOLDER
# interests = books_crawler.get_interests_from_db(server.db, server.api)
# trio.run(books_crawler.run_crawler, interests)

# POPULATE BOOKS TABLE BASED ON FOLDER
# books_crawler.populate_books.populate_books_table(server.db, server.api)

# RECOMMEND BOOKS
# recommend_book_to_users(server.db, server.api)