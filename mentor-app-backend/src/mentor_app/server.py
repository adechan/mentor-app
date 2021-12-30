import os
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from loguru import logger
from .api import MentorAPI


class MentorServer:
    def __init__(self, db_name: str = 'mentor_app'):
        self.app = Flask(db_name)
        self.app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.getcwd()}/{db_name}.db"
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        logger.debug(f'database uri: {self.app.config["SQLALCHEMY_DATABASE_URI"]}')

        self.db = SQLAlchemy(self.app)
        self.api = MentorAPI(db=self.db, schema_path='src/mentor_app/api/schema.graphql')
        self._define_routes()

    def serve(self, host: str = '127.0.0.1', port: int = 8080):
        logger.info(f'Serving on endpoint {host}:{port}')
        self.app.run(host, port)

    def _define_routes(self):
        # TODO: Replace with actual result instead of graphql playground
        #   (probably similar to the below POST version)
        @self.app.route("/graphql", methods=["GET"])
        def graphql_playground():
            return PLAYGROUND_HTML, 200

        @self.app.route("/graphql", methods=["POST"])
        def graphql_server():
            data = request.get_json()
            success, result = graphql_sync(
                self.api.schema,
                data,
                context_value=request,
                debug=self.app.debug
            )

            status_code = 200 if success else 400
            return jsonify(result), status_code
