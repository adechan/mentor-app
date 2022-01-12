from loguru import logger

from hobbies_crawler import crawler

hobbies_url = "https://en.wikipedia.org/wiki/List_of_hobbies"
academic_fields_url = "https://en.wikipedia.org/wiki/List_of_academic_fields"

def populate_course_table(db, api):
    logger.debug(f'populating {db} with {hobbies_url} and {academic_fields_url}')
    courses = crawler.parse_urls(hobbies_url, academic_fields_url)

    for index in range(len(courses) - 1):
        to_add_course = api.Course(course_id=index, title=courses[index])
        db.session.add(to_add_course)

    db.session.commit()


