import datetime
import uuid

import bcrypt
import flask
from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from loguru import logger
from sqlalchemy import exists

from .resolvers import GQLQueryResolver, GQLMutationResolver
from ..error import ServerError
from ..models import define_account_table, define_appointments_table, define_courses_table, define_mentors_table, \
    define_student_table, define_student_interests_table, define_student_award_table, define_mentor_reviews_table, \
    define_available_hours_table, define_mentor_courses_table

class MentorAPI:
    def __init__(self, db, schema_path: str):
        self.Account = define_account_table(db)
        self.Appointment = define_appointments_table(db)
        self.AppointmentAvailableHours = define_available_hours_table(db)
        self.Course = define_courses_table(db)
        self.Mentor = define_mentors_table(db)

        self.MentorReview = define_mentor_reviews_table(db)
        self.MentorCourses = define_mentor_courses_table(db)

        self.Student = define_student_table(db)
        self.StudentInterests = define_student_interests_table(db)
        self.StudentAward = define_student_award_table(db)

        self.query_resolver = GQLQueryResolver(db, self)
        self.mutation_resolver = GQLMutationResolver(db, self)
        self.schema = self._create_gql_schema(schema_path)
        self._db = db

    def _create_gql_schema(self, schema_path: str):
        type_defs = load_schema_from_path(schema_path)
        return make_executable_schema(
            type_defs, self.query_resolver.gql_object_type, self.mutation_resolver.gql_object_type,
            snake_case_fallback_resolvers
        )

    def register_account(self, first_name: str, last_name: str, email: str, password: str) -> int:
        logger.debug(f'{email=} {first_name=} {last_name=}')
        if self._db.session.query(exists().where(self.Account.email == email)).scalar():
            raise ServerError('Account already exists!')

        salt = bcrypt.gensalt()
        pw_hash = bcrypt.hashpw(password.encode(), salt)
        logger.debug(f'{salt=} {pw_hash=}')

        session_id = uuid.uuid4().hex

        # Add to account
        account = self.Account(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=pw_hash,
            # session_id=session_id
        )

        self._db.session.add(account)
        self._db.session.commit()
        self._db.session.refresh(account)

        flask.session[session_id] = dict(
            creation=str(datetime.datetime.now()),
            duration=str(datetime.timedelta(hours=4))
        )

        logger.debug(f'{flask.session=}')
        return account.account_id
