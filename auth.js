// ============================================================
// AUTH — Управление пользователями
// ============================================================

let currentUser = null;

function getUsers() {
    return JSON.parse(localStorage.getItem('nihongo_users') || '{}');
}

function saveUsers(users) {
    localStorage.setItem('nihongo_users', JSON.stringify(users));
}

function getProgress(username) {
    var users = getUsers();
    if (!users[username]) return null;
    return users[username].progress || {};
}

function saveProgress(username, progress) {
    var users = getUsers();
    if (!users[username]) return;
    users[username].progress = progress;
    saveUsers(users);
}

function getDefaultProgress() {
    return {
        total: 0, correct: 0, wrong: 0, xp: 0, days: 1,
        lastVisit: new Date().toDateString(),
        visitHistory: [], visitCount: 0, isRegistered: false,
        quests: {}, questDate: new Date().toDateString(),
        achievements: [], lastXPCheck: 0,
        questsNotified: {}, questIds: [], lastResetDate: '',
        todayStats: { correct: 0, total: 0, xp: 0, learned: 0 },
        todayDate: new Date().toDateString(), oldLevel: 0,
        kanji: { learned: {}, streak: {}, correct: 0, wrong: 0, total: 0 },
        grammar: { completed: {}, streak: {}, correct: 0, wrong: 0, total: 0 },
        vocab: { learned: {}, streak: {}, correct: 0, wrong: 0, total: 0 },
        hangman: { wins: 0, losses: 0, streak: 0 }
    };
}

function register() {
    var username = document.getElementById('regUsername').value.trim();
    var password = document.getElementById('regPassword').value.trim();
    var errorEl = document.getElementById('registerError');
    var successEl = document.getElementById('registerSuccess');
    
    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

    if (!username || username.length < 2) {
        errorEl.textContent = currentLang === 'ru' ? 'Имя должно быть минимум 2 символа' : 'Username must be at least 2 characters';
        errorEl.classList.remove('hidden');
        return;
    }
    if (!password || password.length < 4) {
        errorEl.textContent = currentLang === 'ru' ? 'Пароль должен быть минимум 4 символа' : 'Password must be at least 4 characters';
        errorEl.classList.remove('hidden');
        return;
    }
    
    var users = getUsers();
    if (users[username]) {
        errorEl.textContent = currentLang === 'ru' ? 'Пользователь уже существует' : 'User already exists';
        errorEl.classList.remove('hidden');
        return;
    }
    
    var progress = getDefaultProgress();
    progress.isRegistered = true;
    progress.visitCount = 1;
    users[username] = { password: password, progress: progress };
    saveUsers(users);
    
    successEl.textContent = currentLang === 'ru' ? '✅ Аккаунт создан! Теперь войди.' : '✅ Account created! Now log in.';
    successEl.classList.remove('hidden');
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    setTimeout(function() { showLogin(); }, 1500);
}

function login() {
    var username = document.getElementById('loginUsername').value.trim();
    var password = document.getElementById('loginPassword').value.trim();
    var errorEl = document.getElementById('loginError');
    errorEl.classList.add('hidden');

    var users = getUsers();
    if (!users[username]) {
        errorEl.textContent = currentLang === 'ru' ? 'Пользователь не найден' : 'User not found';
        errorEl.classList.remove('hidden');
        return;
    }
    if (users[username].password !== password) {
        errorEl.textContent = currentLang === 'ru' ? 'Неверный пароль' : 'Wrong password';
        errorEl.classList.remove('hidden');
        return;
    }
    
    currentUser = username;
    localStorage.setItem('nihongo_current_user', currentUser);
    
    document.getElementById('usernameDisplay').textContent = currentUser;
    document.getElementById('userDisplay').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.remove('hidden');
    document.getElementById('authContainer').classList.add('hidden');
    
    var progress = getProgress(currentUser);
    progress.visitCount = (progress.visitCount || 0) + 1;
    saveProgress(currentUser, progress);
    
    if (typeof checkDailyQuests === 'function') checkDailyQuests();
    if (typeof updateDays === 'function') updateDays();
    if (typeof syncTrainerFromProfile === 'function') syncTrainerFromProfile();
    if (typeof checkAllQuestsOnLoad === 'function') checkAllQuestsOnLoad();
    if (typeof updateUI === 'function') updateUI();
    setTimeout(function() { if (typeof checkAchievements === 'function') checkAchievements(); }, 1000);
    
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    if (typeof switchPage === 'function') switchPage('home');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('nihongo_current_user');
    document.getElementById('usernameDisplay').textContent = currentLang === 'ru' ? 'Гость' : 'Guest';
    document.getElementById('userDisplay').classList.remove('hidden');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    if (typeof switchPage === 'function') switchPage('home');
    if (typeof updateUI === 'function') updateUI();
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('registerError').classList.add('hidden');
    document.getElementById('registerSuccess').classList.add('hidden');
}

function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginError').classList.add('hidden');
}

function updateDays() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    var today = new Date().toDateString();
    if (progress.todayDate !== today) {
        progress.todayStats = { correct: 0, total: 0, xp: 0, learned: 0 };
        progress.todayDate = today;
    }
    if (progress.lastVisit !== today) {
        progress.days = (progress.days || 0) + 1;
        if (!progress.visitHistory) progress.visitHistory = [];
        if (progress.visitHistory.indexOf(today) === -1) {
            progress.visitHistory.push(today);
            if (progress.visitHistory.length > 60) progress.visitHistory = progress.visitHistory.slice(-60);
        }
        progress.lastVisit = today;
        saveProgress(currentUser, progress);
    }
}

function calculateStreak() {
    if (!currentUser) return 0;
    var progress = getProgress(currentUser);
    var history = progress.visitHistory || [];
    var today = new Date().toDateString();
    if (history.indexOf(today) === -1) {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (history.indexOf(yesterday.toDateString()) === -1) return 0;
    }
    var streak = 0;
    var checkDate = new Date();
    while (true) {
        var dateStr = checkDate.toDateString();
        if (history.indexOf(dateStr) !== -1) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else break;
    }
    return streak;
}

function getStreakBonus(streak) {
    if (streak >= 30) return 100;
    if (streak >= 7) return 20;
    if (streak >= 3) return 5;
    return 0;
}

function getLevel(xp) { return Math.floor(xp / 100); }

function getRankByLevel(level) {
    if (level >= 71) return { title: '🌟 Божество', threshold: 71, next: null };
    if (level >= 51) return { title: '👑 Император', threshold: 51, next: 71 };
    if (level >= 36) return { title: '⚔️ Сегун', threshold: 36, next: 51 };
    if (level >= 26) return { title: '🧙 Мудрец', threshold: 26, next: 36 };
    if (level >= 16) return { title: '👨‍🏫 Учитель', threshold: 16, next: 26 };
    if (level >= 11) return { title: '👤 Семпай', threshold: 11, next: 16 };
    if (level >= 6) return { title: '🧑‍🎓 Кохай', threshold: 6, next: 11 };
    if (level >= 1) return { title: '📖 Ученик', threshold: 1, next: 6 };
    return { title: '🟤 Простолюдин', threshold: 0, next: 1 };
}

function getQuestName(id) {
    var q = ALL_QUESTS.find(function(item) { return item.id === id; });
    if (!q) return id;
    return currentLang === 'ru' ? q.name_ru : q.name_en;
}

function checkAchievements() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.achievements) progress.achievements = [];
    var newAchievements = [];
    for (var key in ACHIEVEMENTS) {
        if (progress.achievements.indexOf(key) !== -1) continue;
        try {
            var achievement = ACHIEVEMENTS[key];
            if (achievement.check(progress)) {
                newAchievements.push(key);
                progress.achievements.push(key);
                progress.xp = (progress.xp || 0) + achievement.xp;
                var name = currentLang === 'ru' ? achievement.name_ru : achievement.name_en;
                var desc = currentLang === 'ru' ? achievement.desc_ru : achievement.desc_en;
                showAchievementNotification(achievement.icon, name, desc, achievement.xp);
                if (typeof playSound === 'function') playSound('levelup');
            }
        } catch(e) {}
    }
    if (newAchievements.length > 0) {
        saveProgress(currentUser, progress);
        if (typeof updateProfile === 'function') updateProfile();
        if (typeof updateUI === 'function') updateUI();
    }
}

function showAchievementNotification(icon, name, desc, xp) {
    var notif = document.getElementById('notification');
    if (!notif) return;
    document.getElementById('notifIcon').textContent = icon;
    document.getElementById('notifTitle').textContent = '🏆 ' + name;
    document.getElementById('notifSub').textContent = desc + ' (+' + xp + ' XP)';
    notif.style.display = 'block';
    notif.style.borderColor = '#FFD700';
    notif.style.boxShadow = '0 6px 24px rgba(255,215,0,0.5)';
    notif.style.background = '#1a2e1a';
    clearTimeout(window.notifTimeout);
    window.notifTimeout = setTimeout(function() {
        notif.style.display = 'none';
        notif.style.borderColor = '#e94560';
        notif.style.boxShadow = '0 6px 24px rgba(233,69,96,0.4)';
        notif.style.background = '';
    }, 5000);
}

function getAllAchievements() { return ACHIEVEMENTS; }
function getAchievementCategories() { return ACHIEVEMENT_CATEGORIES; }
function getAchievementProgress(progress) {
    var total = Object.keys(ACHIEVEMENTS).length;
    var earned = (progress.achievements || []).length;
    return { total: total, earned: earned, percent: Math.round((earned / total) * 100) };
}
function getAchievementsByCategory(progress) {
    var earned = progress.achievements || [];
    var result = {};
    for (var key in ACHIEVEMENTS) {
        var achievement = ACHIEVEMENTS[key];
        var category = achievement.category;
        if (!result[category]) result[category] = [];
        result[category].push({ id: key, earned: earned.indexOf(key) !== -1, achievement: achievement });
    }
    return result;
}

window.currentUser = currentUser;
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.getProgress = getProgress;
window.saveProgress = saveProgress;
window.getDefaultProgress = getDefaultProgress;
window.register = register;
window.login = login;
window.logout = logout;
window.showRegister = showRegister;
window.showLogin = showLogin;
window.updateDays = updateDays;
window.calculateStreak = calculateStreak;
window.getStreakBonus = getStreakBonus;
window.getLevel = getLevel;
window.getRankByLevel = getRankByLevel;
window.getQuestName = getQuestName;
window.checkAchievements = checkAchievements;
window.getAllAchievements = getAllAchievements;
window.getAchievementCategories = getAchievementCategories;
window.getAchievementProgress = getAchievementProgress;
window.getAchievementsByCategory = getAchievementsByCategory;

console.log('✅ auth.js загружен!');