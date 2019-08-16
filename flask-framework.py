import os
from flask import Flask, render_template
from flask_httpauth import HTTPBasicAuth
from passlib.hash import sha256_crypt

app = Flask(__name__)
auth = HTTPBasicAuth()

#password verification
@auth.verify_password
def verify_password(username, password):
    return sha256_crypt.verify(password, '$5$rounds=535000$ym4ec2WzY/sqzuVK$OqqWwlHE3WYBLe5ERGDlz7k.ZNglHPOaxUYuQxata8C')

@app.route('/test-portfolio')
@auth.login_required
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)