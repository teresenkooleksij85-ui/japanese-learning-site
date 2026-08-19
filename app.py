from flask import Flask, jsonify, request, send_from_directory, session
import os
import sqlite3
import hashlib

app = Flask(__name__, static_folder='.')
app.secret_key = 'japanese_learning_super_secret_key'

DB_NAME = 'database.db'

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            correctCount INTEGER DEFAULT 0,
            wrongCount INTEGER DEFAULT 0,
            streakDays INTEGER DEFAULT 1,
            level INTEGER DEFAULT 1,
            rank TEXT DEFAULT '初心者',
            frame TEXT DEFAULT 'default'
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Настройка CORS-заголовков для всех ответов
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    return response

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return send_from_directory('.', 'index.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({"status": "error", "message": "Заполните все поля!"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"status": "error", "message": "Имя пользователя уже занято!"}), 400

    pwd_hash = hash_password(password)
    cursor.execute(
        'INSERT INTO users (username, password_hash) VALUES (?, ?)',
        (username, pwd_hash)
    )
    conn.commit()
    conn.close()

    session['username'] = username
    return jsonify({"status": "success", "message": "Регистрация успешна!", "username": username})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user and user['password_hash'] == hash_password(password):
        session['username'] = username
        return jsonify({
            "status": "success",
            "message": "Успешный вход!",
            "user": {
                "username": user['username'],
                "correctCount": user['correctCount'],
                "wrongCount": user['wrongCount'],
                "streakDays": user['streakDays'],
                "level": user['level'],
                "rank": user['rank'],
                "frame": user['frame']
            }
        })
    
    return jsonify({"status": "error", "message": "Неверный логин или пароль!"}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"status": "success", "message": "Вышли из системы"})

@app.route('/api/me', methods=['GET'])
def get_current_user():
    username = session.get('username')
    if not username:
        return jsonify({"logged_in": False})

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({
            "logged_in": True,
            "user": {
                "username": user['username'],
                "correctCount": user['correctCount'],
                "wrongCount": user['wrongCount'],
                "streakDays": user['streakDays'],
                "level": user['level'],
                "rank": user['rank'],
                "frame": user['frame']
            }
        })
    return jsonify({"logged_in": False})

@app.route('/api/profile/<username>', methods=['POST'])
def save_profile(username):
    req_data = request.json or {}
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE users 
        SET correctCount = ?, wrongCount = ?, streakDays = ?, level = ?
        WHERE username = ?
    ''', (
        req_data.get("correctCount", 0),
        req_data.get("wrongCount", 0),
        req_data.get("streakDays", 1),
        req_data.get("level", 1),
        username
    ))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "message": "Прогресс сохранён!"})

if __name__ == '__main__':
    print("🚀 Сервер запущен на http://127.0.0.1:5000")
    app.run(debug=True, port=5000)