from ariadne import convert_kwargs_to_snake_case, ObjectType
from loguru import logger

class GQLResolver:
    def __init__(self, db, api, typename: str):
        self.db = db
        self.api = api
        self.gql_object_type = ObjectType(typename)
        self.typename = typename.lower()
        self._setup_subresolvers()

    # Find resolvers in self and attach them to gql schema objects
    def _setup_subresolvers(self):
        logger.debug(f'{self.typename=}')
        resolver_name_pattern = f'resolve_{self.typename}_'
        for method_name in dir(self):
            method = getattr(self, method_name)
            if resolver_name_pattern in method_name and callable(method):
                logger.debug(f'resolver found: {method=}')
                # Ex: 'resolver_query_account_info' -> 'account_info'
                resolver_name = method_name.replace(resolver_name_pattern, '')
                self.gql_object_type.set_field(resolver_name, method)

class GQLQueryResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Query')

    @convert_kwargs_to_snake_case
    def resolve_query_account_info(self, obj, info, account_id):
        try:
            logger.debug(f'{obj=}')
            logger.debug(f'{info=}')
            logger.debug(f'{account_id=}')
            query_result = self.db.session.query(self.api.Account).get(dict(
                account_id=int(account_id)
            ))

            logger.debug(f'{str(query_result)}')
            return query_result

        except Exception as e:
            logger.error(e)

    @convert_kwargs_to_snake_case
    def resolve_query_is_email_in_use(self, obj, info, email: str):
        try:
            logger.debug(f'{obj=}')
            logger.debug(f'{info=}')
            logger.debug(f'{email=}')
            query_result = self.db.session.query(self.api.Account).get(dict(email=email))
            logger.debug(f'{str(query_result)}')
            return True

        except Exception as e:
            logger.error(e)
            return False


class GQLMutationResolver(GQLResolver):
    def __init__(self, db, api):
        super().__init__(db, api, 'Mutation')
