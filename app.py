from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'vikas@86103690'
app.config['MYSQL_DB'] = 'flaskdb'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        age = request.form['age']
        password = request.form['password']
        confirm = request.form['confirm']

        if password != confirm:
            return "Passwords do not match!"

        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (fullname, email, age, password) VALUES (%s, %s, %s, %s)",
                    (fullname, email, age, password))
        mysql.connection.commit()
        cur.close()

        return render_template('success.html', name=fullname, email=email, age=age)

if __name__ == '__main__':
    app.run(debug=True)
