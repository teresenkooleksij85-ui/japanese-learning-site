from flask import Flask, jsonify, request, send_from_directory, session
import os
import sqlite3
import hashlib

app = Flask(__name__, static_folder='.')
app.secret_key = 'japanese_learning_super_secret_key'

DB_NAME = 'database.db'

# Список всех достижений в системе
ACHIEVEMENTS_LIST = {
    "first_step": {"title": "Первый шаг", "desc": "Дать первый правильный ответ."},
    "hundred_correct": {"title": "Первая сотня", "desc": "Набрать 100 правильных ответов."},
    "week_marathon": {"title": "Недельный марафон", "desc": "Заходить в приложение 7 дней подряд."},
    "shogun": {"title": "Сёгун", "desc": "Достичь 20 уровня в профиле."}
}

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Таблица пользователей
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

    # Таблица полученных достижений
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_achievements (
            user_id INTEGER,
            achievement_id TEXT,
            unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id),
            PRIMARY KEY (user_id, achievement_id)
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

def check_and_unlock_achievements(cursor, user_id, user_data):
    """Проверяет условия и выдает ачивки"""
    unlocked = []
    
    # Условия выдачи
    if user_data['correctCount'] >= 1:
        unlocked.append('first_step')
    if user_data['correctCount'] >= 100:
        unlocked.append('hundred_correct')
    if user_data['streakDays'] >= 7:
        unlocked.append('week_marathon')
    if user_data['level'] >= 20:
        unlocked.append('shogun')

    for ach_id in unlocked:
        cursor.execute('''
            INSERT OR IGNORE INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
        ''', (user_id, ach_id))

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
    
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({"status": "error", "message": "Пользователь не найден"}), 404

    user_id = user['id']
    correct = req_data.get("correctCount", 0)
    wrong = req_data.get("wrongCount", 0)
    streak = req_data.get("streakDays", 1)
    
    # Автоматический расчет уровня (каждые 10 правильных ответов = +1 уровень)
    level = max(1, correct // 10 + 1)

    cursor.execute('''
        UPDATE users 
        SET correctCount = ?, wrongCount = ?, streakDays = ?, level = ?
        WHERE username = ?
    ''', (correct, wrong, streak, level, username))

    # Проверяем и выдаем новые достижения
    check_and_unlock_achievements(cursor, user_id, {
        "correctCount": correct,
        "streakDays": streak,
        "level": level
    })

    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "message": "Прогресс и достижения сохранены!"})

@app.route('/api/achievements', methods=['GET'])
def get_achievements():
    username = session.get('username')
    if not username:
        return jsonify({"status": "error", "message": "Необходим вход"}), 401

    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    
    if not user:
        conn.close()
        return jsonify({"status": "error", "message": "Пользователь не найден"}), 404

    # Получаем список открытых ачивок
    cursor.execute('SELECT achievement_id FROM user_achievements WHERE user_id = ?', (user['id'],))
    unlocked_rows = cursor.fetchall()
    unlocked_ids = [row['achievement_id'] for row in unlocked_rows]
    
    conn.close()

    result = []
    for ach_id, data in ACHIEVEMENTS_LIST.items():
        result.append({
            "id": ach_id,
            "title": data["title"],
            "desc": data["desc"],
            "unlocked": ach_id in unlocked_ids
        })

    return jsonify({"status": "success", "achievements": result})

if __name__ == '__main__':
    print("🚀 Сервер запущен на http://127.0.0.1:5000")
    app.run(debug=True, port=5000)