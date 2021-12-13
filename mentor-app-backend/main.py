from mentor_app import app, db


@app.route('/')
def hello():
    return 'Hello!'


app.run(host='127.0.0.1', port=1234)
