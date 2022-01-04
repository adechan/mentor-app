import datetime

from ariadne import convert_kwargs_to_snake_case, ObjectType
from loguru import logger
from mentor_app.error import ServerError, InvalidLogin


class GQLResolver:
    def __init__(self, db, api, typename: str):
        self.db = db
        self.api = api
        self.gql_object_type = ObjectType(typename)
        self.typename = typename
        self._setup_subresolvers()

    # Find resolvers in self and attach them to gql schema objects
    def _setup_subresolvers(self):
        logger.debug(f'{self.typename=}')

        # Find all methods with the following pattern (Ex: 'resolve_query_' in 'resolve_query_account_info')
        resolver_name_pattern = f'resolve_{self.typename.lower()}_'

        for method_name in dir(self):
            method = getattr(self, method_name)
            if resolver_name_pattern in method_name and callable(method):
                logger.debug(f'resolver found: {method=}')

                # Translate to graphql schema query name (Ex: 'resolver_query_account_info' -> 'account_info')
                resolver_name = method_name.replace(resolver_name_pattern, '')
                self.gql_object_type.set_field(resolver_name, method)

class GQLQueryResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Query')

    @convert_kwargs_to_snake_case
    def resolve_query_account_info(self, _, info, account_id):
        try:
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
    def resolve_query_is_email_in_use(self, _, info, email: str):
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
    def resolve_query_get_student_awards(self, _, info, student_id):
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

                course_row = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == award.course_id) \
                    .one()

                item = {
                   "course_title": course_row.title,
                    "mentor_username": mentor_row.username,
                    "date": award.date
                }

                result.append(item)
            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def resolve_query_get_student_interests(self, _, info, student_id):
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
    def resolve_query_get_all_courses(self, _, info):
        try:
            courses = self.db.session.query(self.api.Course) \
                .all()

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
    def resolve_query_get_mentor_courses(self, _, info, mentor_id):
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
    def resolve_query_get_mentor_reviews(self, _, info, mentor_id):
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

                item = {
                    "course_title": courseRow.title,
                    "review": reviewRow.review,
                    "stars": reviewRow.stars,
                    "student_username": studentRow.username,
                    "date": reviewRow.date
                }
                result.append(item)

            return result if len(result) > 0 else None

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def resolve_query_get_student_settings_info(self, _, info, account_id):
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
    def resolve_query_get_mentor_settings_info(self, _, info, account_id):
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
    def resolve_query_get_student_all_recommendations(self, _, info, student_id):
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

                        item = {
                            "mentor_id": mentorInfo.mentor_id,
                            "mentor_profile_image": mentorInfo.profile_image,
                            "mentor_username": mentorInfo.username,
                            "mentor_country": mentorInfo.country,
                            "mentor_city": mentorInfo.city,
                            "course_id": courseInfo.course_id,
                            "course": courseInfo.title,
                            "price": mentorRow.price
                        }
                        result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def resolve_query_get_create_appointment_info(self, _, info, mentor_id, course_id):
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

            item = {
                "mentor_username": mentor_info.username,
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
    def resolve_query_get_student_all_appointments(self, _, info, student_id):
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

                item = {
                    "appointment_id": appointmentRow.id,
                    "mentor_username": mentorRow.username,
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
    def resolve_query_get_mentor_all_appointments(self, _, info, mentor_id):
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

                item = {
                    "appointment_id": appointmentRow.id,
                    "student_username": studentRow.username,
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
    def resolve_query_get_student_all_mentors(self, _, info, student_id):
        try:

            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.student_id == student_id) \
                .filter(self.api.Appointment.status == "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                mentorUsername = self.db.session.query(self.api.Mentor) \
                    .filter(self.api.Mentor.mentor_id == appointmentRow.mentor_id) \
                    .one().username

                course = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                reviewRow = self.db.session.query(self.api.MentorReview) \
                    .filter(self.api.MentorReview.mentor_id == appointmentRow.mentor_id) \
                    .filter(self.api.MentorReview.course_id == appointmentRow.course_id) \
                    .filter(self.api.MentorReview.student_id == student_id) \
                    .all()

                review = ""
                if len(reviewRow) > 0:
                    review = reviewRow.review

                item = {
                    "mentor_id": appointmentRow.mentor_id,
                    "username": mentorUsername,
                    "course_id": appointmentRow.course_id,
                    "course_title": course,
                    "review": review
                }

                result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def resolve_query_get_mentor_all_students(self, _, info, mentor_id):
        try:

            result = []

            appointmentRows = self.db.session.query(self.api.Appointment) \
                .filter(self.api.Appointment.mentor_id == mentor_id) \
                .filter(self.api.Appointment.status == "FINISHED") \
                .all()

            for appointmentRow in appointmentRows:
                studentUsername = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == appointmentRow.student_id) \
                    .one().username

                course = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == appointmentRow.course_id) \
                    .one().title

                item = {
                    "student_id": appointmentRow.student_id,
                    "username": studentUsername,
                    "course_id": appointmentRow.course_id,
                    "course_title": course,
                }

                result.append(item)

            return result

        except Exception as e:
            logger.exception(e)
            return dict(error='No matches')

    @convert_kwargs_to_snake_case
    def resolve_query_get_mentor_details(self, _, info, mentor_id):
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
                student_username = self.db.session.query(self.api.Student) \
                    .filter(self.api.Student.student_id == row.student_id) \
                    .one().username

                course_title = self.db.session.query(self.api.Course) \
                    .filter(self.api.Course.course_id == row.course_id) \
                    .one().title
                item = {
                    "review": row.review,
                    "course_title": course_title,
                    "student_username": student_username,
                }

                reviews.append(item)

            result = {
                "mentor_username": mentor.username,
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
    def resolve_mutation_login(self, _, info, email: str, password: str):
        try:
            self.api.login_account(email, password)
            return dict(result=True)

        except InvalidLogin:
            return dict(error='Invalid username or password')

    @convert_kwargs_to_snake_case
    def resolve_mutation_register_student(self, _,
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
    def resolve_mutation_register_mentor(self, _,
        info, first_name: str, last_name: str, email: str, password: str,
        profile: dict
    ):
        # Add to account + mentor tables
        try:
            account_id = self.api.register_account(first_name, last_name, email, password)

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
    def resolve_mutation_delete_student_interest(self, _,
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
    def resolve_mutation_add_student_interest(self, _,
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
    def resolve_mutation_add_mentor_course(self, _,
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
    def resolve_mutation_delete_mentor_course(self, _,
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
    def resolve_mutation_update_student_settings_info(self, _,
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
                         "statement": settings_info["statement"]})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_update_mentor_settings_info(self, _,
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
                         "quote": settings_info["quote"]})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_create_appointment(self, _,
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
    def resolve_mutation_cancel_appointment(self, _,
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
    def resolve_mutation_mentor_accept_appointment(self, _,
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
    def resolve_mutation_mentor_finish_appointment(self, _,
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
    def resolve_mutation_student_review_mentor(self, _,
        info, student_id, mentor_id, course_id, review
    ):
        try:
            review = self.api.MentorReview(
                student_id=student_id,
                course_id=course_id,
                mentor_id=mentor_id,
                review=review,
                stars=0,
                date=datetime.datetime.now()
            )

            self.db.session.add(review)
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_student_edit_review_mentor(self, _,
        info, student_id, mentor_id, course_id, review
    ):
        try:
            self.db.session.query(self.api.MentorReview) \
                .filter(self.api.MentorReview.student_id == student_id) \
                .filter(self.api.MentorReview.course_id == course_id) \
                .filter(self.api.MentorReview.mentor_id == mentor_id) \
                .update({"review": review})
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_mentor_award_student(self, _,
        info, student_id, mentor_id, course_id
    ):
        try:
            award = self.api.StudentAward(
                student_id=student_id,
                course_id=course_id,
                mentor_id=mentor_id,
                date=datetime.datetime.now()
            )

            self.db.session.add(award)
            self.db.session.commit()

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_create_student_profile(self, _,
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

            return dict(result=True)

        except Exception as e:
            logger.exception(e)

    @convert_kwargs_to_snake_case
    def resolve_mutation_create_mentor_profile(self, _,
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

            return dict(result=True)

        except Exception as e:
            logger.exception(e)


