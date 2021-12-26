from mentor_app import app, db, models
from pprint import pprint
from loguru import logger

@app.route('/')
def hello():
    return 'Hello!'

def create_db():
    db.create_all()

    appointment = models.Appointment(id=0, status='Test appointment')
    db.session.add(appointment)
    db.session.commit()
    logger.debug(f'Appointment {appointment} committed')

pprint(vars(db))
create_db()
#app.run(host='127.0.0.1', port=1234)
