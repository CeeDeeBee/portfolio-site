import os
from flask import Flask, render_template
from flask_httpauth import HTTPBasicAuth
from passlib.hash import sha256_crypt

app = Flask(__name__)
auth = HTTPBasicAuth()

#password verification
@auth.verify_password
def verify_password(username, password):
    return sha256_crypt.verify(password, '$5$rounds=535000$WIAPJULaZXoJdA5k$QaMDS1JUXtjg7gZALu2zBs5qqiHvn7CeXAfWL/fW1YC')

# @app.route('/test-portfolio')
# @auth.login_required
@app.route('/')
def index():
    return render_template('main-portfolio.html')

@app.route('/classic')
@auth.login_required
def classic():
    return render_template('classic.html')
'''
@app.route('/writer')
@auth.login_required
def writer():
    return render_template('essays.html')
    '''
if __name__ == '__main__':
    app.run(debug=True) #debug=True