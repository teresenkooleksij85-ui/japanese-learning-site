from flask import Flask, jsonify, request, send_from_directory
import os
import json

app = Flask(__name__, static_folder='.')

# Файл для хранения данных пользователей (в качестве мини-БД)
DATA_FILE = 'users_data.json'

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# --- МАРШРУТЫ ДЛЯ СТАТИЧЕСКИХ ФАЙЛОВ (HTML, CSS, JS) ---

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

# --- API ДЛЯ СОХРАНЕНИЯ И ПОЛУЧЕНИЯ ПРОГРЕССА ---

@app.route('/api/profile/<username>', methods=['GET'])
def get_profile(username):
    data = load_data()
    user_info = data.get(username, {
        "correctCount": 0,
        "wrongCount": 0,
        "streakDays": 1,
        "level": 1
    })
    return jsonify(user_info)

@app.route('/api/profile/<username>', methods=['POST'])
def save_profile(username):
    req_data = request.json
    data = load_data()
    
    data[username] = {
        "correctCount": req_data.get("correctCount", 0),
        "wrongCount": req_data.get("wrongCount", 0),
        "streakDays": req_data.get("streakDays", 1),
        "level": req_data.get("level", 1)
    }
    
    save_data(data)
    return jsonify({"status": "success", "message": "Прогресс сохранён!"})

if __name__ == '__main__':
    print("🚀 Сервер запущен на http://127.0.0.1:5000")
    app.run(debug=True, port=5000)