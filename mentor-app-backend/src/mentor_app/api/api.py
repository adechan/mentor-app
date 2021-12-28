from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from .resolvers import GQLQueryResolver, GQLMutationResolver
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

    def _create_gql_schema(self, schema_path: str):
        type_defs = load_schema_from_path(schema_path)
        return make_executable_schema(
            type_defs, self.query_resolver.gql_object_type, self.mutation_resolver.gql_object_type,
            snake_case_fallback_resolvers
        )
