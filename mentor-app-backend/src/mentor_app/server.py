import os

import flask
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from graphql import MiddlewareManager
from loguru import logger

from . import file_server
from .api import MentorAPI
from .error import ServerError, InvalidFileType


class MentorServer:
    def __init__(self, db_name: str = 'mentor_app'):
        self.app = Flask(db_name)
        CORS(self.app, supports_credentials=True)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.getcwd()}/{db_name}.db"
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app.config['SECRET_KEY'] = os.urandom(32).hex()
        self.app.config['UPLOAD_FOLDER'] = os.path.abspath('./avatars')
        logger.debug(f'database uri: {self.app.config["SQLALCHEMY_DATABASE_URI"]}')

        self.db = SQLAlchemy(self.app)
        self.api = MentorAPI(db=self.db, schema_path='src/mentor_app/api/schema.graphql')

        self._define_routes()

    def serve(self, host: str = '127.0.0.1', port: int = 8080):
        logger.info(f'Serving on endpoint {host}:{port}')
        self.app.run(host, port)

    def _define_routes(self):
        @self.app.route("/upload", methods=["POST"])
        @cross_origin(supports_credentials=True)
        def upload_file():
            logger.debug(f'{request=}')
            logger.debug(f'{request.data=}')
            try:
                filename = file_server.save_file(request.data)
                logger.debug(f'{filename=}')
                return make_response(jsonify(filename), 200)

            except InvalidFileType as e:
                logger.exception(e)
                return make_response(jsonify(e), 415)

        @self.app.route("/avatar/<path:filename>", methods=["GET"])
        @cross_origin(supports_credentials=True)
        def get_avatar(filename):
            logger.debug(f'{request=}')
            logger.debug(f'{filename=}')
            return file_server.upload_file(filename, upload_folder=self.app.config['UPLOAD_FOLDER'])

        @self.app.route("/graphql", methods=["POST"])
        @cross_origin(supports_credentials=True)
        def graphql_server():
            data = request.get_json()
            session_id = flask.session['id'] if 'id' in flask.session else None
            logger.debug(f'{flask.session=}')

            def check_auth_middleware(resolver, obj, info, **kwargs):
                logger.debug(f'{info.path=}')
                if MentorAPI.is_authenticated_query(info.path):
                    if session_id is None:
                        raise ServerError('Not authenticated!')

                return resolver(obj, info, **kwargs)

            logger.trace(f'{data=}')
            logger.trace(f'{session_id=}')

            success, result = graphql_sync(
                self.api.schema, data,
                context_value=request,
                debug=self.app.debug,
                middleware=MiddlewareManager(check_auth_middleware)
            )

            logger.trace(f'{success=} {result=}')
            return make_response(jsonify(result), 200)
