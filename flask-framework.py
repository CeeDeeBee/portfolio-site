import os
from flask import Flask, render_template

template_dir = os.path.abspath('/')
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', template_folder=template_dir)

if __name__ == '__main__':
    app.run(debug=True)