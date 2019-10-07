import os
from flask import Flask, render_template
from flask_httpauth import HTTPBasicAuth
from passlib.hash import sha256_crypt

app = Flask(__name__)
auth = HTTPBasicAuth()

#password verification
@auth.verify_password
def verify_password(username, password):
    return sha256_crypt.verify(password, '$5$rounds=535000$wQZnJI6FWOX9DiVr$PZW/TcyBDi/0wlMyj361nXpmBTdweSzO33FUEzPMAy1')

@app.route('/test-portfolio')
@auth.login_required
def index():
    return render_template('main-portfolio.html')

@app.route('/classic')
@auth.login_required
def classic():
    return render_template('classic.html')
    
if __name__ == '__main__':
    app.run(debug=True) #debug=True