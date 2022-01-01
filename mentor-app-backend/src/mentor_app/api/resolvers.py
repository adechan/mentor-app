import flask
from ariadne import convert_kwargs_to_snake_case, ObjectType
from loguru import logger
from mentor_app.error import NotAuthenticated, ServerError

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



class GQLMutationResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Mutation')

    @convert_kwargs_to_snake_case
    def resolve_mutation_register_student(self, _,
        info, first_name: str, last_name: str, email: str, password: str,
        profile: dict
    ):
        # Add to account + student + student interests tables
        try:
            account_id = self.api.register_account(first_name, last_name, email, password)

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