import datetime

import flask
from ariadne import convert_kwargs_to_snake_case, ObjectType
from loguru import logger
from mentor_app.error import ServerError, InvalidLogin


class GQLResolver:
    def __init__(self, db, api, typename: str):
        self.db = db
        self.api = api
        self.gql_object_type = ObjectType(typename) # Query or Mutation
        self.typename = typename
        self._setup_handlers()

    # Find handlers in self and attach them to gql schema objects
    def _setup_handlers(self):
        logger.debug(f'{self.typename=}')

        # Find all methods with the following pattern (Ex: 'handle_query_' in 'handle_query_account_info')
        handler_name_pattern = f'handle_{self.typename.lower()}_'

        # Find all of our handlers using dir (list all functions and variables inside self)
        for function_name in dir(self):
            # Get the handler function
            function = getattr(self, function_name)
            # Check that the name follows the handler name pattern, and that we can call it (not a variable).
            if handler_name_pattern in function_name and callable(function):
                logger.debug(f'handler found: {function=}')

                # Translate to graphql schema query name (Ex: 'handle_query_account_info' -> 'account_info')
                handler_name = function_name.replace(handler_name_pattern, '')

                # Tell the GQL schema this handler will handle the operation `handler_name`
                # Example: self.Query.set_field('account_info', self.handle_query_account_info)
                self.gql_object_type.set_field(handler_name, function)

class GQLQueryResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Query')

    @convert_kwargs_to_snake_case
    def handle_query_account_info(self, _, info):
        try:
            account_id = flask.session['account_id']
            logger.debug(f'{info=}')
            logger.debug(f'{account_id=}')
            # .get when using primary key
            query_result = self.db.session.query(self.api.Account).get(dict(
                account_id=int(account_id)
            ))

            logger.debug(f'{str(query_result)}')
            return query_result

        except Exception as e:
            logger.error(e)

    @convert_kwargs_to_snake_case
    def handle_query_is_email_in_use(self, _, info, email: str):
        try:
            logger.debug(f'{info=}')
            logger.debug(f'{email=}')
            # .filter when using sql where clause (Ex :"WHERE thing = ?")
            query_results = list(self.db.session.query(self.api.Account).filter(self.api.Account.email == email))
            return dict(result=len(query_results) > 0)

        # except NotAuthenticated as e:
        #     return dict(error=str(e))

        except Exception as e:
            logger.exception(e)
            return dict(error='Error finding e-mail in database!')

    @convert_kwargs_to_snake_case
    def handle_query_get_all_recommended_books(self, _, info, student_id):
        try:
            recommended_books_rows = self.db.session.query(self.api.StudentRecommendedBooks) \
                .filter(self.api.StudentRecommendedBooks.student_id == student_id) \
                .all()

            result = []

            for recommended_book in recommended_books_rows:
                book_row = self.db.session.query(self.api.Book) \
                    .filter(self.api.Book.id == recommended_book.book_id) \
                    .one()

                item = {
                    "book_id": recommended_book.book_id,
                    "image": book_row.image,
                    "title": book_row.title,
                    "author": book_row.author,
                    "rating": recommended_book.rating
                }

                logger.debug(f'{item=}')

                result.append(item)
            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_awards(self, _, info, student_id):
        try:
            awards = self.db.session.query(self.api.StudentAward) \
                .filter(self.api.StudentAward.student_id == student_id) \
                .order_by(self.api.StudentAward.date.desc())\
                .all()

            result = []

            for award in awards:
                logger.debug(f'{award.course_id=}')
                mentor_row = self.db.session.query(self.api.Mentor) \
                    .filter(self.api.Mentor.mentor_id == award.mentor_id) \
                    .one()

                account_row = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.mentor_id == mentor_row.mentor_id) \
                    .one()

                course_row = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == award.course_id) \
                    .one()

                name = account_row.first_name + ' ' + account_row.last_name

                item = {
                   "course_title": course_row.title,
                    "mentor_username": name,
                    "date": award.date
                }

                result.append(item)
            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_interests(self, _, info, student_id):
        try:
            interests = self.db.session.query(self.api.StudentInterests, self.api.Course) \
                .filter(self.api.StudentInterests.student_id == student_id) \
                .join(self.api.Course, self.api.StudentInterests.course_id == self.api.Course.course_id) \
                .all()

            result = []
            for interest, course in interests:
                item = {
                    "course_id": course.course_id,
                    "course_title": course.title
                }
                result.append(item)

            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_all_courses(self, _, info):
        try:
            start = datetime.datetime.now()
            courses = self.db.session.query(self.api.Course) \
                .all()

            end = datetime.datetime.now()
            logger.debug(f'Course.all() time: {end - start}')

            result = []
            for course in courses:
                item = {
                    "course_id": course.course_id,
                    "course_title": course.title
                }
                result.append(item)

            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_courses(self, _, info, mentor_id):
        try:

            result = []
            courses = self.db.session.query(self.api.MentorCourses) \
                .filter(self.api.MentorCourses.mentor_id == mentor_id) \
                .all()

            for course in courses:
                courseRow = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == course.course_id) \
                    .one()

                availableHours = self.db.session.query(self.api.AppointmentAvailableHours) \
                    .filter(self.api.AppointmentAvailableHours.course_id == course.course_id) \
                    .filter(self.api.AppointmentAvailableHours.mentor_id == mentor_id) \
                    .all()

                # assuming all values from Day are the same
                hours = []
                day = ""
                for availableHour in availableHours:
                    day = availableHour.day
                    hours.append(availableHour.hours)

                item = {
                    "course_id": course.course_id,
                    "course_title": courseRow.title,
                    "price": course.price,
                    "day": day,
                    "hours": hours
                }

                result.append(item)

            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_reviews(self, _, info, mentor_id):
        try:
            reviews = self.db.session.query(self.api.MentorReview) \
                .filter(self.api.MentorReview.mentor_id == mentor_id) \
                .all()

            result = []
            for reviewRow in reviews:
                courseRow = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == reviewRow.course_id) \
                    .one() # get title from here

                studentRow = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == reviewRow.student_id) \
                    .one() # get student_username from here

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.student_id == studentRow.student_id) \
                    .one()

                name = accountRow.first_name + ' ' + accountRow.last_name

                item = {
                    "course_title": courseRow.title,
                    "review": reviewRow.review,
                    "stars": reviewRow.stars,
                    "student_username": name,
                    "date": reviewRow.date
                }
                result.append(item)

            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_settings_info(self, _, info, account_id):
        try:
            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .one()

            studentRow = self.db.session.query(self.api.Student) \
                .filter(self.api.Student.student_id == accountRow.student_id) \
                .one()

            result = {
                "first_name": accountRow.first_name,
                "last_name": accountRow.last_name,
                "student_username": studentRow.username,
                "student_email": studentRow.student_email,
                "country": studentRow.country,
                "city": studentRow.city,
                "statement": studentRow.statement,
                "hobbies": studentRow.hobbies,
            }

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_settings_info(self, _, info, account_id):
        try:
            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .one()

            mentorRow = self.db.session.query(self.api.Mentor) \
                .filter(self.api.Mentor.mentor_id == accountRow.mentor_id) \
                .one()

            result = {
                "first_name": accountRow.first_name,
                "last_name": accountRow.last_name,
                "mentor_username": mentorRow.username,
                "mentor_email": mentorRow.mentor_email,
                "country": mentorRow.country,
                "city": mentorRow.city,
                "statement": mentorRow.statement,
                "hobbies": mentorRow.hobbies,
                "quote": mentorRow.quote
            }

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_all_recommendations(self, _, info, student_id):
        try:
            result = []

            studentInterestRows = self.db.session.query(self.api.StudentInterests) \
                .filter(self.api.StudentInterests.student_id == student_id) \
                .all()

            interests = []
            for studentInterestRow in studentInterestRows:
                courseId = studentInterestRow.course_id

                interests.append(courseId)

            mentors = []
            for interestId in interests:
                mentorRows = self.db.session.query(self.api.MentorCourses) \
                    .filter(self.api.MentorCourses.course_id == interestId) \
                    .all()

                for mentorRow in mentorRows:
                    mentors.append(mentorRow.mentor_id)

            for mentorId in mentors:
                mentorRows = self.db.session.query(self.api.MentorCourses) \
                    .filter(self.api.MentorCourses.mentor_id == mentorId) \
                    .all()  # get price from here

                for mentorRow in mentorRows:
                    if mentorRow.course_id in interests:
                        mentorInfo = self.db.session.query(self.api.Mentor) \
                            .filter(self.api.Mentor.mentor_id == mentorRow.mentor_id) \
                            .one()  # get mentor info from here

                        courseInfo = self.db.session.query(self.api.Course) \
                            .filter(self.api.Course.course_id == mentorRow.course_id) \
                            .one()  # get course info from here

                        mentorReviews = self.db.session.query(self.api.MentorReview) \
                            .filter(self.api.MentorReview.mentor_id == mentorRow.mentor_id) \
                            .filter(self.api.MentorReview.course_id == mentorRow.course_id) \
                            .all()

                        average_rating = 0
                        number_of_reviews = 0

                        sum_of_rating = 0
                        for row in mentorReviews:
                            sum_of_rating += row.stars
                            number_of_reviews += 1

                        if (sum_of_rating != 0 and number_of_reviews != 0):
                            average_rating = sum_of_rating / number_of_reviews

                        accountRow = self.db.session.query(self.api.Account) \
                            .filter(self.api.Account.mentor_id == mentorRow.mentor_id) \
                            .one()

                        name = accountRow.first_name + ' ' + accountRow.last_name

                        item = {
                            "mentor_id": mentorInfo.mentor_id,
                            "mentor_profile_image": mentorInfo.profile_image,
                            "mentor_username": name,
                            "mentor_country": mentorInfo.country,
                            "mentor_city": mentorInfo.city,
                            "course_id": courseInfo.course_id,
                            "course": courseInfo.title,
                            "price": mentorRow.price,
                            "average_rating": average_rating,
                            "number_of_reviews": number_of_reviews,
                        }

                        if item not in result:
                            result.append(item)

            result.sort(key=lambda item: item["average_rating"], reverse=True)
            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_create_appointment_info(self, _, info, mentor_id, course_id):
        try:
            mentor_info = self.db.session.query(self.api.Mentor) \
                .filter(self.api.Mentor.mentor_id == mentor_id) \
                .one()

            course_info = self.db.session.query(self.api.Course) \
                .filter(self.api.Course.course_id == course_id) \
                .one()

            price = self.db.session.query(self.api.MentorCourses) \
                .filter(self.api.MentorCourses.course_id == course_id) \
                .filter(self.api.MentorCourses.mentor_id == mentor_id) \
                .one().price

            available_hours_rows = self.db.session.query(self.api.AppointmentAvailableHours) \
                .filter(self.api.AppointmentAvailableHours.course_id == course_id) \
                .filter(self.api.AppointmentAvailableHours.mentor_id == mentor_id) \
                .filter(self.api.AppointmentAvailableHours.available == 1) \
                .all()

            hours = []
            for row in available_hours_rows:
                item = {
                    "day": row.day,
                    "hour": row.hours,
                    "available_hours_id": row.id
                }
                hours.append(item)

            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.mentor_id == mentor_info.mentor_id) \
                .one()

            name = accountRow.first_name + ' ' + accountRow.last_name

            item = {
                "mentor_username": name,
                "mentor_email": mentor_info.mentor_email,
                "course": course_info.title,
                "course_id": course_info.course_id,
                "price": price,
                "available_hours": hours
            }

            return item

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_all_appointments(self, _, info, student_id):
        try:
            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.student_id == student_id) \
                .filter(self.api.Appointment.status != "CANCELED") \
                .filter(self.api.Appointment.status != "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                mentorRow = self.db.session.query(self.api.Mentor) \
                    .filter(self.api.Mentor.mentor_id == appointmentRow.mentor_id) \
                    .one() # mentor info from here

                courseTitle = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                price = self.db.session.query(self.api.MentorCourses) \
                    .filter(self.api.MentorCourses.mentor_id == appointmentRow.mentor_id) \
                    .filter(self.api.MentorCourses.course_id == appointmentRow.course_id) \
                    .one().price # mentor info from here

                appointmentHoursRow = self.db.session.query(self.api.AppointmentAvailableHours) \
                    .filter(self.api.AppointmentAvailableHours.id == appointmentRow.available_hours_id) \
                    .one()  # mentor info from here

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.mentor_id == mentorRow.mentor_id) \
                    .one()

                name = accountRow.first_name + ' ' + accountRow.last_name

                item = {
                    "appointment_id": appointmentRow.id,
                    "mentor_username": name,
                    "mentor_email": mentorRow.mentor_email,
                    "course": courseTitle,
                    "price": price,
                    "day": appointmentHoursRow.day,
                    "hour": appointmentHoursRow.hours,
                    "status": appointmentRow.status
                }
                result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_all_appointments(self, _, info, mentor_id):
        try:
            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.mentor_id == mentor_id) \
                .filter(self.api.Appointment.status != "CANCELED") \
                .filter(self.api.Appointment.status != "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                studentRow = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == appointmentRow.student_id) \
                    .one()  # mentor info from here

                courseTitle = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                price = self.db.session.query(self.api.MentorCourses) \
                    .filter(self.api.MentorCourses.mentor_id == appointmentRow.mentor_id) \
                    .filter(self.api.MentorCourses.course_id == appointmentRow.course_id) \
                    .one().price  # mentor info from here

                appointmentHoursRow = self.db.session.query(self.api.AppointmentAvailableHours) \
                    .filter(self.api.AppointmentAvailableHours.id == appointmentRow.available_hours_id) \
                    .one()  # mentor info from here

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.student_id == studentRow.student_id) \
                    .one()

                name = accountRow.first_name + ' ' + accountRow.last_name

                item = {
                    "appointment_id": appointmentRow.id,
                    "student_username": name,
                    "student_email": studentRow.student_email,
                    "course": courseTitle,
                    "price": price,
                    "day": appointmentHoursRow.day,
                    "hour": appointmentHoursRow.hours,
                    "status": appointmentRow.status
                }
                result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_student_all_mentors(self, _, info, student_id):
        try:

            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.student_id == student_id) \
                .filter(self.api.Appointment.status == "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                mentorRow = self.db.session.query(self.api.Mentor) \
                    .filter(self.api.Mentor.mentor_id == appointmentRow.mentor_id) \
                    .one()

                course = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                reviewRow = self.db.session.query(self.api.MentorReview) \
                    .filter(self.api.MentorReview.mentor_id == appointmentRow.mentor_id) \
                    .filter(self.api.MentorReview.course_id == appointmentRow.course_id) \
                    .filter(self.api.MentorReview.student_id == student_id) \
                    .all()

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.mentor_id == appointmentRow.mentor_id) \
                    .one()

                review = ""
                stars = 0
                if len(reviewRow) > 0:
                    logger.debug(reviewRow)
                    review = reviewRow[0].review
                    stars = reviewRow[0].stars

                name = accountRow.first_name + ' ' + accountRow.last_name

                item = {
                    "mentor_id": appointmentRow.mentor_id,
                    "username": name,
                    "course_id": appointmentRow.course_id,
                    "course_title": course,
                    "review": review,
                    "stars": stars
                }

                if item not in result:
                    result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_all_students(self, _, info, mentor_id):
        try:

            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.mentor_id == mentor_id) \
                .filter(self.api.Appointment.status == "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                studentRow = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == appointmentRow.student_id) \
                    .one()

                course = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                awardRows = self.db.session.query(self.api.StudentAward) \
                    .filter(self.api.Student.student_id == appointmentRow.student_id) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .filter(self.api.Mentor.mentor_id == mentor_id) \
                    .all()

                awarded = False
                if len(awardRows) > 0:
                    awarded = awardRows[0].awarded

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.student_id == studentRow.student_id) \
                    .one()

                name = accountRow.first_name + ' ' + accountRow.last_name

                item = {
                    "student_id": appointmentRow.student_id,
                    "username": name,
                    "course_id": appointmentRow.course_id,
                    "course_title": course,
                    "awarded": awarded
                }

                if item not in result:
                    result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def handle_query_get_mentor_details(self, _, info, mentor_id):
        try:
            mentor = self.db.session.query(self.api.Mentor) \
                .filter(self.api.Mentor.mentor_id == mentor_id) \
                .one() # mentor details from here

            courses_rows = self.db.session.query(self.api.MentorCourses) \
                .filter(self.api.MentorCourses.mentor_id == mentor_id) \
                .all() # get course + course price

            courses = []
            for row in courses_rows:
                course_title = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == row.course_id) \
                    .one().title

                item = {
                    "course_id": row.course_id,
                    "course_title": course_title,
                    "price": row.price,
                }

                courses.append(item)

            reviews_rows = self.db.session.query(self.api.MentorReview) \
                .filter(self.api.MentorReview.mentor_id == mentor_id) \
                .order_by(self.api.MentorReview.date.desc()) \
                .all()

            reviews = []
            for row in reviews_rows:
                studentRow = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == row.student_id) \
                    .one()

                course_title = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == row.course_id) \
                    .one().title

                accountRow = self.db.session.query(self.api.Account) \
                    .filter(self.api.Account.student_id == studentRow.student_id) \
                    .one()

                name = accountRow.first_name + ' ' + accountRow.last_name
                item = {
                    "review": row.review,
                    "course_title": course_title,
                    "student_username": name,
                }

                reviews.append(item)

            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.mentor_id == mentor.mentor_id) \
                .one()

            name = accountRow.first_name + ' ' + accountRow.last_name
            result = {
                "mentor_username": name,
                "country": mentor.country,
                "city": mentor.city,
                "quote": mentor.quote,
                "courses": courses,
                "reviews": reviews
            }
            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

class GQLMutationResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Mutation')

    @convert_kwargs_to_snake_case
    def handle_mutation_login(self, _, info, email: str, password: str):
        try:
            self.api.login_account(email, password)
            return dict(result=True)

        except InvalidLogin:
            return dict(error='Invalid username or password')

    @convert_kwargs_to_snake_case
    def handle_mutation_register_student(self, _,
        info, first_name: str, last_name: str, email: str, password: str,
        profile: dict
    ):
        # Add to account + student + student interests tables
        try:
            account_id, session_id = self.api.register_account(first_name, last_name, email, password)

            # Add to student
            student = self.api.Student(
                username=profile["username"],
                profile_image=profile["profile_image"],
                country=profile["country"],
                city=profile["city"],
                student_email=profile["student_email"],
                hobbies=profile["hobbies"],
                statement=profile["statement"]
            )

            self.db.session.add(student)
            self.db.session.commit()

            self.db.session.refresh(student)
            logger.debug(f'{student.student_id=}')

            # Update account
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"student_id": student.student_id})
            self.db.session.commit()

            # Add in Student interests
            interest = self.api.StudentInterests(
                course_id=profile["course_id"],
                student_id=student.student_id
            )

            self.db.session.add(interest)
            self.db.session.commit()
            return dict(result=True)

        except ServerError as e:
            logger.exception(e)
            return dict(error=str(e))

        except Exception as e:
            logger.exception(e)
            return dict(error='There was an error handling your request')

    @convert_kwargs_to_snake_case
    def handle_mutation_register_mentor(self, _,
        info, first_name: str, last_name: str, email: str, password: str,
        profile: dict
    ):
        # Add to account + mentor tables
        try:
            account_id, session_id = self.api.register_account(first_name, last_name, email, password)

            # Add to student
            mentor = self.api.Mentor(
                username=profile["username"],
                profile_image=profile["profile_image"],
                country=profile["country"],
                city=profile["city"],
                mentor_email=profile["mentor_email"],
                hobbies=profile["hobbies"],
                statement=profile["statement"],
                quote=profile["quote"]
            )

            self.db.session.add(mentor)
            self.db.session.commit()
            self.db.session.refresh(mentor)

            # Update account
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"mentor_id": mentor.mentor_id})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_delete_student_interest(self, _,
        info, student_id, course_id
    ):
        try:
            self.db.session.query(self.api.StudentInterests) \
                .filter(self.api.StudentInterests.student_id == student_id) \
                .filter(self.api.StudentInterests.course_id == course_id) \
                .delete()
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_add_student_interest(self, _,
        info, student_id, course_id
    ):
        try:
            student_interest = self.api.StudentInterests(
                student_id=student_id,
                course_id=course_id,
            )

            self.db.session.add(student_interest)
            self.db.session.commit()
            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_add_mentor_course(self, _,
        info, mentor_id, course_id, price, day, hours
    ):
        try:
            mentor_course = self.api.MentorCourses(
                mentor_id=mentor_id,
                course_id=course_id,
                price=price
            )

            self.db.session.add(mentor_course)
            self.db.session.commit()

            for hour in hours:
                available_hour = self.api.AppointmentAvailableHours(
                    mentor_id=mentor_id,
                    course_id=course_id,
                    day=day,
                    hours=hour,
                    available=True
                )
                self.db.session.add(available_hour)
                self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_delete_mentor_course(self, _,
    info, mentor_id, course_id
    ):
        try:
            self.db.session.query(self.api.MentorCourses) \
                .filter(self.api.MentorCourses.mentor_id == mentor_id) \
                .filter(self.api.MentorCourses.course_id == course_id) \
                .delete()
            self.db.session.commit()

            self.db.session.query(self.api.AppointmentAvailableHours) \
                .filter(self.api.AppointmentAvailableHours.mentor_id == mentor_id) \
                .filter(self.api.AppointmentAvailableHours.course_id == course_id) \
                .delete()
            self.db.session.commit()
            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_update_student_settings_info(self, _,
    info, account_id, settings_info
    ):
        try:
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"first_name": settings_info["first_name"],
                         "last_name": settings_info["last_name"]})
            self.db.session.commit()

            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .one()

            self.db.session.query(self.api.Student) \
                .filter(self.api.Student.student_id == accountRow.student_id) \
                .update({"student_email": settings_info["student_email"],
                         "country": settings_info["country"],
                         "city": settings_info["city"],
                         "hobbies": settings_info["hobbies"],
                         "statement": settings_info["statement"],
                         "username": settings_info["username"]})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_update_mentor_settings_info(self, _,
    info, account_id, settings_info
    ):
        try:
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"first_name": settings_info["first_name"],
                         "last_name": settings_info["last_name"]})
            self.db.session.commit()

            accountRow = self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .one()

            self.db.session.query(self.api.Mentor) \
                .filter(self.api.Mentor.mentor_id == accountRow.mentor_id) \
                .update({"mentor_email": settings_info["mentor_email"],
                         "country": settings_info["country"],
                         "city": settings_info["city"],
                         "hobbies": settings_info["hobbies"],
                         "statement": settings_info["statement"],
                         "quote": settings_info["quote"],
                         "username": settings_info["username"]})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_create_appointment(self, _,
    info, student_id, course_id, mentor_id, available_hours_id
    ):
        try:
            appointment = self.api.Appointment(
                student_id=student_id,
                course_id=course_id,
                mentor_id=mentor_id,
                available_hours_id=available_hours_id,
                status="PENDING"
            )
            self.db.session.add(appointment)
            self.db.session.commit()

            # available field to false - nobody else can make an appointment with this day/hour
            self.db.session.query(self.api.AppointmentAvailableHours) \
                .filter(self.api.AppointmentAvailableHours.mentor_id == mentor_id) \
                .filter(self.api.AppointmentAvailableHours.course_id == course_id) \
                .update({"available": False})
            self.db.session.commit()


            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_cancel_appointment(self, _,
    info, appointment_id
    ):
        try:
            self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.id == appointment_id) \
                .update({"status": "CANCELED"})
            self.db.session.commit()

            appointment = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.id == appointment_id) \
                .one()

            self.db.session.query(self.api.AppointmentAvailableHours) \
                .filter(self.api.AppointmentAvailableHours.id == appointment.available_hours_id) \
                .update({"available": True})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_mentor_accept_appointment(self, _,
        info, appointment_id
    ):
        try:
            self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.id == appointment_id) \
                .update({"status": "ACCEPTED"})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_mentor_finish_appointment(self, _,
        info, appointment_id
    ):
        try:
            self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.id == appointment_id) \
                .update({"status": "FINISHED"})
            self.db.session.commit()

            appointment = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.id == appointment_id) \
                .one()

            self.db.session.query(self.api.AppointmentAvailableHours) \
                .filter(self.api.AppointmentAvailableHours.id == appointment.available_hours_id) \
                .update({"available": True})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_student_review_mentor(self, _,
        info, student_id, mentor_id, course_id, review, stars
    ):
        try:
            review = self.api.MentorReview(
                student_id=student_id,
                course_id=course_id,
                mentor_id=mentor_id,
                review=review,
                stars=stars,
                date=datetime.datetime.now()
            )

            self.db.session.add(review)
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_student_edit_review_mentor(self, _,
        info, student_id, mentor_id, course_id, review, stars
    ):
        try:
            self.db.session.query(self.api.MentorReview) \
                .filter(self.api.MentorReview.student_id == student_id) \
                .filter(self.api.MentorReview.course_id == course_id) \
                .filter(self.api.MentorReview.mentor_id == mentor_id) \
                .update({"review": review,
                         "stars": stars})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_mentor_award_student(self, _,
        info, student_id, mentor_id, course_id
    ):
        try:
            award = self.api.StudentAward(
                student_id=student_id,
                course_id=course_id,
                mentor_id=mentor_id,
                awarded=True,
                date=datetime.datetime.now()
            )

            self.db.session.add(award)
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_student_rate_book(self, _,
    info, student_id, book_id, rating
    ):
        try:

            self.db.session.query(self.api.StudentRecommendedBooks) \
                .filter(self.api.StudentRecommendedBooks.student_id == student_id) \
                .filter(self.api.StudentRecommendedBooks.book_id == book_id) \
                .update({"rating": rating})

            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_create_student_profile(self, _,
        info, account_id, profile
    ):
        try:
            student = self.api.Student(
                username=profile["username"],
                profile_image=profile["profile_image"],
                country=profile["country"],
                city=profile["city"],
                student_email=profile["student_email"],
                hobbies=profile["hobbies"],
                statement=profile["statement"],
            )

            self.db.session.add(student)
            self.db.session.commit()
            self.db.session.refresh(student)

            # Update account
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"student_id": student.student_id})
            self.db.session.commit()

            # Add in Student interests
            interest = self.api.StudentInterests(
                course_id=profile["course_id"],
                student_id=student.student_id
            )

            self.db.session.add(interest)
            self.db.session.commit()

            return dict(result=student.student_id)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def handle_mutation_logout(self, *args):
        if len(flask.session.keys()) == 0:
            return dict(error='Not logged in')

        flask.session.clear()
        return dict(result=True)

    @convert_kwargs_to_snake_case
    def handle_mutation_create_mentor_profile(self, _,
        info, account_id, profile
    ):
        try:
            mentor = self.api.Mentor(
                username=profile["username"],
                profile_image=profile["profile_image"],
                country=profile["country"],
                city=profile["city"],
                mentor_email=profile["mentor_email"],
                hobbies=profile["hobbies"],
                statement=profile["statement"],
                quote=profile["quote"],
            )

            self.db.session.add(mentor)
            self.db.session.commit()
            self.db.session.refresh(mentor)

            # Update account
            self.db.session.query(self.api.Account) \
                .filter(self.api.Account.account_id == account_id) \
                .update({"mentor_id": mentor.mentor_id})
            self.db.session.commit()

            return dict(result=mentor.mentor_id)

        except Exception as e:
            logger.exception(e)


