import datetime
import functools
import os
from typing import Union

import flask
import graphql.error
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from graphql import MiddlewareManager, GraphQLResolveInfo
from loguru import logger
from .api import MentorAPI
from .error import ServerError

class MentorServer:
    def __init__(self, db_name: str = 'mentor_app'):
        self.app = Flask(db_name)
        CORS(self.app, supports_credentials=True)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.getcwd()}/{db_name}.db"
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app.config['SECRET_KEY'] = os.urandom(32).hex()
        logger.debug(f'database uri: {self.app.config["SQLALCHEMY_DATABASE_URI"]}')

        self.db = SQLAlchemy(self.app)
        self.api = MentorAPI(db=self.db, schema_path='src/mentor_app/api/schema.graphql')

        self._define_routes()

    def serve(self, host: str = '127.0.0.1', port: int = 8080):
        logger.info(f'Serving on endpoint {host}:{port}')
        self.app.run(host, port)

    def _define_routes(self):
        # TODO: remove this route for production
        @self.app.route("/graphql", methods=["GET"])
        @cross_origin(supports_credentials=True)
        def graphql_playground():
            return PLAYGROUND_HTML, 200

        @self.app.route("/graphql", methods=["POST"])
        @cross_origin(supports_credentials=True)
        def graphql_server():
            data = request.get_json()
            session_id = request.cookies.get('session_id') if 'session_id' in request.cookies else None

            def check_auth_middleware(resolver, obj, info, **kwargs):
                logger.debug(f'{info.path=}')
                if MentorAPI.is_authenticated_query(info.path):
                    if session_id is None:
                        raise ServerError('Not authenticated!')

                return resolver(obj, info, **kwargs)

            logger.debug(f'{data=}')
            logger.debug(f'{session_id=}')

            success, result = graphql_sync(
                self.api.schema, data,
                context_value=request,
                debug=self.app.debug,
                middleware=MiddlewareManager(check_auth_middleware)
            )

            logger.debug(f'{success=} {result=}')
            response = make_response(jsonify(result), 200)
            if 'id' in flask.session:
                logger.debug(f'Cookie set!')
                # response.set_cookie(
                #     key='session_id', value=flask.session['id'],
                #     max_age=flask.session['duration'],
                #     httponly=True
                # )

            return response
