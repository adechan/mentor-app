import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from loguru import logger

db_name = 'mentor_app'

app = Flask('mentor_app')
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.getcwd()}/{db_name}.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
logger.debug(f'database uri: {app.config["SQLALCHEMY_DATABASE_URI"]}')

db = SQLAlchemy(app)
