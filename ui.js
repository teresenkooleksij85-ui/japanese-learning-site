// ============================================================
// UI — Интерфейс пользователя
// ============================================================

var currentLang = 'ru';

// ============================================================
// Переключение языка
// ============================================================

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-ru][data-en]').forEach(function(el) {
        var text = el.dataset[lang];
        if (text) {
            if (el.tagName === 'INPUT' && el.dataset[lang + '-placeholder']) {
                el.placeholder = el.dataset[lang + '-placeholder'];
            } else {
                el.innerHTML = text;
            }
        }
    });

    document.querySelectorAll('input[data-ru-placeholder][data-en-placeholder]').forEach(function(el) {
        el.placeholder = el.dataset[lang + '-placeholder'];
    });

    document.querySelectorAll('button[data-ru][data-en]').forEach(function(el) {
        if (el.dataset[lang]) el.innerHTML = el.dataset[lang];
    });

    var usernameEl = document.getElementById('usernameDisplay');
    if (usernameEl) {
        var guestText = lang === 'ru' ? 'Гость' : 'Guest';
        if (!currentUser) usernameEl.textContent = guestText;
    }

    updateAllTrainers();
    renderKanjiList();
    renderGrammarList();
    renderVocabList();
    updateQuestsUI();
    updateUI();
    renderFilterPanel();
    renderKanjiFilterPanel();
    renderAllAchievements();
    renderAchievementCategories();
}

function updateAllTrainers() {
    if (document.getElementById('vocabTrain').style.display !== 'none') loadVocabQuestion();
    if (document.getElementById('kanjiTrain').style.display !== 'none') loadKanjiQuestion();
    if (document.getElementById('grammarTrain').style.display !== 'none') loadGrammarQuestion();
    if (document.getElementById('alphabetTrainer').style.display !== 'none') loadNewQuestion();
}

// ============================================================
// Навигация
// ============================================================

var navLinks = document.querySelectorAll('.nav a[data-page]');
var pages = {
    home: document.getElementById('page-home'),
    profile: document.getElementById('page-profile'),
    quests: document.getElementById('page-quests'),
    alphabet: document.getElementById('page-alphabet'),
    kanji: document.getElementById('page-kanji'),
    grammar: document.getElementById('page-grammar'),
    vocab: document.getElementById('page-vocab'),
    achievements: document.getElementById('page-achievements'),
    hangman: document.getElementById('page-hangman')
};

function switchPage(pageId) {
    for (var key in pages) { if (pages[key]) pages[key].classList.remove('active'); }
    if (pages[pageId]) pages[pageId].classList.add('active');
    navLinks.forEach(function(link) { link.classList.toggle('active', link.dataset.page === pageId); });
    
    if (pageId === 'alphabet') {
        var tableEl = document.getElementById('alphabetTable');
        if (tableEl && !tableEl.innerHTML) renderAlphabetTable('hiragana');
        var trainerEl = document.getElementById('alphabetTrainer');
        if (trainerEl && trainerEl.style.display !== 'none') {
            if (!trainerInitialized) initTrainer();
            else { syncTrainerFromProfile(); loadNewQuestion(); renderFilterPanel(); }
        }
    }
    if (pageId === 'kanji') { loadKanjiProgress(); renderKanjiList(); renderKanjiFilterPanel(); if (!kanjiTrainQueue.length) { shuffleKanjiQueue(); loadKanjiQuestion(); } updateKanjiStats(); }
    if (pageId === 'grammar') { loadGrammarProgress(); renderGrammarList(); if (!grammarTrainQueue.length) { shuffleGrammarQueue(); loadGrammarQuestion(); } updateGrammarStats(); }
    if (pageId === 'vocab') { loadVocabProgress(); renderVocabList(); if (!vocabTrainQueue.length) { shuffleVocabQueue(); loadVocabQuestion(); } updateVocabStats(); }
    if (pageId === 'achievements') switchAchievementsTab('all');
    if (pageId === 'profile') updateProfile();
    if (pageId === 'quests') updateQuestsUI();
}

// ============================================================
// Уведомления
// ============================================================

function showNotification(icon, title, subtitle) {
    var notif = document.getElementById('notification');
    document.getElementById('notifIcon').textContent = icon;
    document.getElementById('notifTitle').textContent = title;
    document.getElementById('notifSub').textContent = subtitle || '';
    notif.style.display = 'block';
    clearTimeout(window.notifTimeout);
    window.notifTimeout = setTimeout(function() { notif.style.display = 'none'; }, 3000);
}

// ============================================================
// Профиль
// ============================================================

function updateProfile() {
    if (!currentUser) {
        ['pTotal','pCorrect','pWrong','pAccuracy','pXP','pDays','pStreak','pLevel','pNextRankXP','pRankBar',
         'pAlphabetCorrect','pAlphabetWrong','pAlphabetAccuracy','pAlphabetBar',
         'pKanjiLearned','pKanjiCorrect','pKanjiWrong','pKanjiBar',
         'pGrammarCompleted','pGrammarCorrect','pGrammarWrong','pGrammarBar',
         'pVocabLearned','pVocabCorrect','pVocabWrong','pVocabBar'
        ].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                if (id === 'pRankBar' || id.indexOf('Bar') !== -1) el.style.width = '0%';
                else if (id === 'pRank') el.textContent = currentLang === 'ru' ? 'Простолюдин' : 'Commoner';
                else el.textContent = id.indexOf('Accuracy') !== -1 ? '0%' : '0';
            }
        });
        document.getElementById('pStreakBonus').textContent = '';
        return;
    }
    
    var progress = getProgress(currentUser);
    var total = progress.total || 0, correct = progress.correct || 0, wrong = progress.wrong || 0;
    var xp = progress.xp || 0, days = progress.days || 1, level = getLevel(xp);
    var streak = calculateStreak(), streakBonus = getStreakBonus(streak);
    
    document.getElementById('pTotal').textContent = total;
    document.getElementById('pCorrect').textContent = correct;
    document.getElementById('pWrong').textContent = wrong;
    document.getElementById('pAccuracy').textContent = total > 0 ? Math.round((correct / total) * 100) + '%' : '0%';
    document.getElementById('pXP').textContent = xp;
    document.getElementById('pDays').textContent = days;
    document.getElementById('pLevel').textContent = level;
    document.getElementById('pStreak').textContent = streak;
    document.getElementById('pStreakBonus').textContent = streakBonus > 0 ? '🔥 +' + streakBonus + ' XP бонус!' : '';
    
    var rank = getRankByLevel(level);
    document.getElementById('pRank').textContent = rank.title;
    if (rank.next !== null) {
        var nextLevelXP = rank.next * 100, currentLevelXP = rank.threshold * 100;
        var xpToNext = nextLevelXP - xp;
        document.getElementById('pNextRankXP').textContent = xpToNext > 0 ? xpToNext : '0';
        var percent = Math.min(100, ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
        document.getElementById('pRankBar').style.width = percent + '%';
    } else {
        document.getElementById('pNextRankXP').textContent = currentLang === 'ru' ? 'Максимум!' : 'Max!';
        document.getElementById('pRankBar').style.width = '100%';
    }
    
    var alphabetTotal = correct + wrong;
    document.getElementById('pAlphabetCorrect').textContent = correct;
    document.getElementById('pAlphabetWrong').textContent = wrong;
    document.getElementById('pAlphabetAccuracy').textContent = alphabetTotal > 0 ? Math.round((correct / alphabetTotal) * 100) + '%' : '0%';
    document.getElementById('pAlphabetBar').style.width = alphabetTotal > 0 ? Math.min(100, (correct / Math.max(100, alphabetTotal)) * 100) + '%' : '0%';
    
    var kanjiData = progress.kanji || { learned: {}, correct: 0, wrong: 0 };
    var kanjiLearned = Object.values(kanjiData.learned || {}).filter(function(v) { return v; }).length;
    document.getElementById('pKanjiLearned').textContent = kanjiLearned;
    document.getElementById('pKanjiCorrect').textContent = kanjiData.correct || 0;
    document.getElementById('pKanjiWrong').textContent = kanjiData.wrong || 0;
    document.getElementById('pKanjiBar').style.width = Math.min(100, (kanjiLearned / KANJI_DATA.length) * 100) + '%';
    
    var grammarData = progress.grammar || { completed: {}, correct: 0, wrong: 0 };
    var grammarCompleted = Object.values(grammarData.completed || {}).filter(function(v) { return v; }).length;
    document.getElementById('pGrammarCompleted').textContent = grammarCompleted;
    document.getElementById('pGrammarCorrect').textContent = grammarData.correct || 0;
    document.getElementById('pGrammarWrong').textContent = grammarData.wrong || 0;
    document.getElementById('pGrammarBar').style.width = Math.min(100, (grammarCompleted / GRAMMAR_DATA.length) * 100) + '%';
    
    var vocabData = progress.vocab || { learned: {}, correct: 0, wrong: 0 };
    var vocabLearned = Object.values(vocabData.learned || {}).filter(function(v) { return v; }).length;
    document.getElementById('pVocabLearned').textContent = vocabLearned;
    document.getElementById('pVocabCorrect').textContent = vocabData.correct || 0;
    document.getElementById('pVocabWrong').textContent = vocabData.wrong || 0;
    document.getElementById('pVocabBar').style.width = Math.min(100, (vocabLearned / VOCAB_DATA.length) * 100) + '%';
    
    var achievements = progress.achievements || [];
    var achEl = document.getElementById('achievementsList');
    if (achEl) {
        if (achievements.length === 0) {
            achEl.innerHTML = '<span style="color:#a7a9be;">' + (currentLang === 'ru' ? 'Пока нет достижений. Продолжай учиться!' : 'No achievements yet. Keep learning!') + '</span>';
        } else {
            var achNames = achievements.map(function(id) {
                var ach = ACHIEVEMENTS[id];
                if (!ach) return '🏅 ' + id;
                return currentLang === 'ru' ? ach.name_ru : ach.name_en;
            });
            achEl.innerHTML = achNames.map(function(a) { return '<span style="background:#1a1a2e; padding:4px 12px; border-radius:20px; border:1px solid #FFD700; color:#FFD700;">' + a + '</span>'; }).join('');
        }
    }
}

// ============================================================
// Модальное окно с ошибками
// ============================================================

function showErrors() {
    if (!currentUser) { showNotification('🔐', currentLang === 'ru' ? 'Войди в аккаунт' : 'Log in', ''); return; }
    var progress = getProgress(currentUser);
    var errors = {
        'Азбука': { correct: progress.correct || 0, wrong: progress.wrong || 0 },
        'Кандзи': { correct: progress.kanji ? progress.kanji.correct || 0 : 0, wrong: progress.kanji ? progress.kanji.wrong || 0 : 0 },
        'Грамматика': { correct: progress.grammar ? progress.grammar.correct || 0 : 0, wrong: progress.grammar ? progress.grammar.wrong || 0 : 0 },
        'Слова': { correct: progress.vocab ? progress.vocab.correct || 0 : 0, wrong: progress.vocab ? progress.vocab.wrong || 0 : 0 }
    };
    var html = '';
    for (var section in errors) {
        var data = errors[section];
        var total = data.correct + data.wrong;
        var percent = total > 0 ? Math.round((data.correct / total) * 100) : 0;
        var color = percent >= 80 ? '#4CAF50' : percent >= 50 ? '#FF9800' : '#f44336';
        html += '<div style="background:#0f0e17; border-radius:10px; padding:10px; margin-bottom:8px; border-left:3px solid ' + color + ';">' +
            '<div style="display:flex; justify-content:space-between; font-weight:700;"><span>' + section + '</span><span style="color:' + color + ';">' + percent + '%</span></div>' +
            '<div style="font-size:13px; color:#a7a9be;">✅ ' + data.correct + ' правильных | ❌ ' + data.wrong + ' ошибок</div>' +
            (data.wrong > 0 ? '<div style="font-size:11px; color:#f44336; margin-top:4px;">💡 ' + data.wrong + ' ошибок — стоит повторить!</div>' : '') +
        '</div>';
    }
    document.getElementById('errorsList').innerHTML = html;
    document.getElementById('errorsModal').style.display = 'flex';
}

// ============================================================
// Квесты
// ============================================================

function updateQuestsUI() {
    if (!currentUser) {
        document.getElementById('questsList').innerHTML = '<p style="color:#6c6e8a; font-size:13px;">' + (currentLang === 'ru' ? 'Войди, чтобы видеть задания' : 'Log in to see quests') + '</p>';
        document.getElementById('questBonusStatus').textContent = '+0 XP';
        return;
    }
    var progress = getProgress(currentUser);
    var questIds = progress.questIds || [], q = progress.quests || {};
    var today = new Date().toDateString(), canReset = progress.lastResetDate !== today;
    var resetBtn = document.getElementById('resetQuestsBtn');
    if (resetBtn) {
        if (canReset) { resetBtn.textContent = currentLang === 'ru' ? '🔄 Обновить задания' : '🔄 Refresh quests'; resetBtn.style.opacity = '1'; resetBtn.style.cursor = 'pointer'; }
        else { resetBtn.textContent = currentLang === 'ru' ? '✅ Обновлено сегодня' : '✅ Refreshed today'; resetBtn.style.opacity = '0.6'; resetBtn.style.cursor = 'not-allowed'; }
    }
    if (questIds.length === 0) { document.getElementById('questsList').innerHTML = '<p style="color:#6c6e8a; font-size:13px;">' + (currentLang === 'ru' ? 'Задания на сегодня не сгенерированы.' : 'No quests generated for today.') + '</p>'; return; }
    var html = '', allDone = true;
    questIds.forEach(function(id) {
        var questData = ALL_QUESTS.find(function(qq) { return qq.id === id; });
        if (!questData) return;
        var done = q[id] || false;
        var name = currentLang === 'ru' ? questData.name_ru : questData.name_en;
        var status = done ? '✅' : '⬜';
        var cls = done ? 'quest-done' : 'quest-undone';
        var statusText = done ? (currentLang === 'ru' ? 'Выполнено' : 'Done') : (currentLang === 'ru' ? 'Не выполнено' : 'Not done');
        html += '<div class="quest-item"><span class="quest-name">' + status + ' ' + name + '</span><span class="quest-xp">+' + questData.xp + ' XP</span><span class="quest-level">' + questData.level + '</span><span class="' + cls + '">' + statusText + '</span></div>';
        if (!done) allDone = false;
    });
    document.getElementById('questsList').innerHTML = html;
    if (allDone && questIds.length > 0 && !progress.bonusGiven) {
        progress.xp = (progress.xp || 0) + 50;
        progress.bonusGiven = true;
        saveProgress(currentUser, progress);
        showNotification('🎉', currentLang === 'ru' ? 'Все задания выполнены!' : 'All quests completed!', '+50 XP bonus!');
        updateProfile(); updateUI();
    }
    document.getElementById('questBonusStatus').textContent = allDone ? '+50 XP ✅' + (currentLang === 'ru' ? ' Бонус получен!' : ' Bonus claimed!') : '+50 XP (' + (currentLang === 'ru' ? 'выполни все задания' : 'complete all quests') + ')';
}

// ============================================================
// Обновление основного UI
// ============================================================

function updateUI() {
    var isLoggedIn = !!currentUser;
    document.getElementById('userDisplay').classList.toggle('hidden', !isLoggedIn);
    document.getElementById('logoutBtn').classList.toggle('hidden', !isLoggedIn);
    document.getElementById('authContainer').classList.toggle('hidden', isLoggedIn);
    if (isLoggedIn) {
        document.getElementById('usernameDisplay').textContent = currentUser;
        completeQuest('auth', 10, currentLang === 'ru' ? '🔐 Добро пожаловать!' : '🔐 Welcome!', '+10 XP');
        completeQuest('visit', 5, currentLang === 'ru' ? '👋 Первый визит!' : '👋 First visit!', '+5 XP');
    }
    updateProfile();
    updateQuestsUI();
    updateHomeStats();
}

// ============================================================
// Реклама
// ============================================================

var adRewardCooldown = 0;

function showRewardedAd() {
    var now = Date.now();
    if (now - adRewardCooldown < 60000) {
        showNotification('⏳', currentLang === 'ru' ? 'Подожди немного' : 'Wait a moment', currentLang === 'ru' ? 'Реклама доступна раз в минуту' : 'Ad available once per minute');
        return;
    }
    showNotification('📺', currentLang === 'ru' ? 'Реклама загружается...' : 'Loading ad...', currentLang === 'ru' ? 'Нажми на уведомление для просмотра' : 'Click notification to watch');
    setTimeout(function() {
        if (currentUser) {
            var progress = getProgress(currentUser);
            progress.xp = (progress.xp || 0) + 10;
            saveProgress(currentUser, progress);
            adRewardCooldown = Date.now();
            showNotification('🎉', '+10 XP ' + (currentLang === 'ru' ? 'за просмотр рекламы!' : 'for watching ad!'), currentLang === 'ru' ? 'Спасибо, что поддерживаешь проект' : 'Thank you for supporting the project');
            updateProfile(); updateUI();
        } else {
            showNotification('🔐', currentLang === 'ru' ? 'Войди в аккаунт' : 'Log in', currentLang === 'ru' ? 'Чтобы получать XP за рекламу' : 'To get XP for watching ads');
        }
    }, 2000);
}

function initRealAds() {
    showNotification('📢', 'Реклама готова', currentLang === 'ru' ? 'Подставь свой код в initRealAds()' : 'Insert your code in initRealAds()');
}

// ============================================================
// СТАТИСТИКА НА ГЛАВНОЙ
// ============================================================

function updateHomeStats() {
    var container = document.getElementById('homeStats');
    if (!container) return;
    if (!currentUser) { container.style.display = 'none'; return; }
    container.style.display = 'block';
    var progress = getProgress(currentUser);
    var today = new Date().toDateString();
    var todayData = progress.todayStats || { correct: 0, total: 0, xp: 0, learned: 0 };
    if (progress.todayDate !== today) {
        progress.todayStats = { correct: 0, total: 0, xp: 0, learned: 0 };
        progress.todayDate = today;
        saveProgress(currentUser, progress);
        document.getElementById('todayCorrect').textContent = '0';
        document.getElementById('todayTotal').textContent = '0';
        document.getElementById('todayXP').textContent = '+0';
        document.getElementById('todayLearned').textContent = '0';
        document.getElementById('todayProgressBar').style.width = '0%';
        return;
    }
    document.getElementById('todayCorrect').textContent = todayData.correct || 0;
    document.getElementById('todayTotal').textContent = todayData.total || 0;
    document.getElementById('todayXP').textContent = '+' + (todayData.xp || 0);
    document.getElementById('todayLearned').textContent = todayData.learned || 0;
    var total = todayData.total || 0;
    var percent = Math.min(100, (total / 20) * 100);
    document.getElementById('todayProgressBar').style.width = percent + '%';
    document.getElementById('todayGoalText').textContent = total >= 20 ? '✅ Цель достигнута!' : 'Цель: ' + total + '/20 ответов';
}

// ============================================================
// ЗВУКИ
// ============================================================

var soundEnabled = true;

function playSound(type) {
    if (!soundEnabled) return;
    var sounds = { correct: document.getElementById('soundCorrect'), wrong: document.getElementById('soundWrong'), levelup: document.getElementById('soundLevelUp') };
    var sound = sounds[type];
    if (sound) { sound.currentTime = 0; sound.play().catch(function() {}); }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    showNotification('🔊', soundEnabled ? 'Звук включён' : 'Звук выключен', '');
}

// ============================================================
// ГЛОБАЛЬНЫЙ ПОИСК
// ============================================================

function globalSearch(query) {
    var resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    query = query.trim().toLowerCase();
    if (!query || query.length < 1) { resultsContainer.style.display = 'none'; return; }
    var results = [];
    KANJI_DATA.forEach(function(item) {
        var kanji = item.kanji, readings = item.readings.toLowerCase();
        var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
        if (kanji.indexOf(query) !== -1 || readings.indexOf(query) !== -1 || meaning.indexOf(query) !== -1) {
            results.push({ type: 'kanji', typeLabel: '🀄 Кандзи', main: kanji, sub: item.readings + ' — ' + (currentLang === 'ru' ? item.meaning_ru : item.meaning_en), page: 'kanji', data: item });
        }
    });
    VOCAB_DATA.forEach(function(item) {
        var word = item.word, reading = item.reading.toLowerCase();
        var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
        var type = item.type.toLowerCase();
        if (word.indexOf(query) !== -1 || reading.indexOf(query) !== -1 || meaning.indexOf(query) !== -1 || type.indexOf(query) !== -1) {
            results.push({ type: 'word', typeLabel: '📖 Слово', main: word, sub: item.reading + ' — ' + (currentLang === 'ru' ? item.meaning_ru : item.meaning_en), page: 'vocab', data: item });
        }
    });
    GRAMMAR_DATA.forEach(function(item) {
        var pattern = item.pattern.toLowerCase();
        var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
        var question = (currentLang === 'ru' ? item.question_ru : item.question_en).toLowerCase();
        var answer = item.answer.toLowerCase();
        if (pattern.indexOf(query) !== -1 || meaning.indexOf(query) !== -1 || question.indexOf(query) !== -1 || answer.indexOf(query) !== -1) {
            results.push({ type: 'grammar', typeLabel: '📚 Грамматика', main: item.pattern, sub: currentLang === 'ru' ? item.meaning_ru : item.meaning_en, page: 'grammar', data: item, question: currentLang === 'ru' ? item.question_ru : item.question_en });
        }
    });
    var limited = results.slice(0, 10);
    if (limited.length === 0) { resultsContainer.innerHTML = '<div class="search-empty">' + (currentLang === 'ru' ? '🔍 Ничего не найдено' : '🔍 Nothing found') + '</div>'; resultsContainer.style.display = 'block'; return; }
    var html = '';
    limited.forEach(function(result, index) {
        var typeClass = result.type;
        html += '<div class="search-item" onclick="goToSearchResult(' + index + ')" data-index="' + index + '"><span class="search-type ' + typeClass + '">' + result.typeLabel + '</span><div><div class="search-main">' + result.main + '</div><div class="search-sub">' + result.sub + '</div></div></div>';
    });
    window._searchResults = limited;
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
}

function goToSearchResult(index) {
    var results = window._searchResults || [];
    if (!results[index]) return;
    var result = results[index];
    var resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) resultsContainer.style.display = 'none';
    var input = document.getElementById('globalSearch');
    if (input) input.value = '';
    switchPage(result.page);
    var message = '';
    if (result.type === 'kanji') message = '🀄 ' + result.main + ' — ' + result.sub;
    else if (result.type === 'word') message = '📖 ' + result.main + ' — ' + result.sub;
    else if (result.type === 'grammar') message = '📚 ' + result.main + ' — ' + result.sub;
    showNotification('🔍', message, '');
    if (result.type === 'grammar' && result.page === 'grammar') {
        setTimeout(function() {
            var cards = document.querySelectorAll('#grammarGrid > div');
            cards.forEach(function(card) {
                var text = card.textContent;
                if (text.indexOf(result.data.pattern) !== -1 || text.indexOf(result.question) !== -1) {
                    card.style.borderColor = '#e94560';
                    card.style.boxShadow = '0 0 20px rgba(233,69,96,0.3)';
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(function() { card.style.borderColor = ''; card.style.boxShadow = ''; }, 3000);
                }
            });
        }, 500);
    }
}

document.addEventListener('click', function(e) {
    var container = document.querySelector('.search-container');
    if (container && !container.contains(e.target)) {
        var results = document.getElementById('searchResults');
        if (results) results.style.display = 'none';
    }
});

// ============================================================
// ТЕМЫ ОФОРМЛЕНИЯ
// ============================================================

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('nihongo_theme', theme);
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function loadTheme() {
    var saved = localStorage.getItem('nihongo_theme') || 'dark';
    setTheme(saved);
}

// ============================================================
// СТРАНИЦА ДОСТИЖЕНИЙ
// ============================================================

function switchAchievementsTab(tab) {
    document.querySelectorAll('.achievement-tab-content').forEach(function(el) { el.style.display = 'none'; });
    document.getElementById('achievementsAll').style.display = (tab === 'all') ? 'block' : 'none';
    document.getElementById('achievementsCategories').style.display = (tab === 'categories') ? 'block' : 'none';
    document.querySelectorAll('.btn-achievement-tab').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) { btn.classList.add('active'); btn.style.background = '#e94560'; btn.style.color = 'white'; }
        else { btn.style.background = '#2a2a4a'; btn.style.color = '#a7a9be'; }
    });
    if (tab === 'all') renderAllAchievements();
    if (tab === 'categories') renderAchievementCategories();
}

function renderAllAchievements() {
    var container = document.getElementById('achievementsAllList');
    if (!container) return;
    if (!currentUser) { container.innerHTML = '<p style="color:#6c6e8a;">' + (currentLang === 'ru' ? 'Войди, чтобы видеть достижения' : 'Log in to see achievements') + '</p>'; return; }
    var progress = getProgress(currentUser);
    var earned = progress.achievements || [];
    var html = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px,1fr)); gap:8px;">';
    for (var key in ACHIEVEMENTS) {
        var ach = ACHIEVEMENTS[key];
        var isEarned = earned.indexOf(key) !== -1;
        var name = currentLang === 'ru' ? ach.name_ru : ach.name_en;
        var desc = currentLang === 'ru' ? ach.desc_ru : ach.desc_en;
        html += '<div style="background:' + (isEarned ? '#1a3a2e' : '#1a1a2e') + '; border:2px solid ' + (isEarned ? '#FFD700' : '#2a2a4a') + '; border-radius:12px; padding:12px; text-align:center; transition:0.3s; opacity:' + (isEarned ? '1' : '0.5') + ';"' + (isEarned ? ' onmouseenter="this.style.transform=\'scale(1.03)\'; this.style.borderColor=\'#FF6B00\'" onmouseleave="this.style.transform=\'scale(1)\'; this.style.borderColor=\'#FFD700\'"' : '') + '>' +
            '<div style="font-size:32px;">' + ach.icon + '</div>' +
            '<div style="font-size:14px; font-weight:700; color:' + (isEarned ? '#FFD700' : '#6c6e8a') + ';">' + name + '</div>' +
            '<div style="font-size:11px; color:#a7a9be; margin-top:4px;">' + desc + '</div>' +
            '<div style="font-size:10px; color:#e94560; margin-top:4px;">+' + ach.xp + ' XP</div>' +
            (isEarned ? '<div style="color:#4CAF50; font-size:11px; margin-top:4px;">✅ ' + (currentLang === 'ru' ? 'Получено' : 'Earned') + '</div>' : '<div style="color:#6c6e8a; font-size:11px; margin-top:4px;">🔒 ' + (currentLang === 'ru' ? 'Не получено' : 'Locked') + '</div>') +
        '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function renderAchievementCategories() {
    var container = document.getElementById('achievementsCategoriesList');
    if (!container) return;
    if (!currentUser) { container.innerHTML = '<p style="color:#6c6e8a;">' + (currentLang === 'ru' ? 'Войди, чтобы видеть достижения' : 'Log in to see achievements') + '</p>'; return; }
    var progress = getProgress(currentUser);
    var categories = getAchievementsByCategory(progress);
    var html = '';
    for (var catKey in categories) {
        var items = categories[catKey];
        var catName = ACHIEVEMENT_CATEGORIES[catKey];
        if (!catName) continue;
        var name = currentLang === 'ru' ? catName.name_ru : catName.name_en;
        var earned = items.filter(function(i) { return i.earned; }).length;
        var total = items.length;
        html += '<div style="background:#1a1a2e; border-radius:12px; padding:12px; margin-bottom:12px; border:1px solid #2a2a4a;">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><span style="font-size:16px; font-weight:700;">' + name + '</span><span style="font-size:13px; color:#e94560;">' + earned + '/' + total + '</span></div>' +
            '<div style="background:#0f0e17; border-radius:4px; height:4px; overflow:hidden;"><div style="height:100%; width:' + (earned/total)*100 + '%; background:#e94560; border-radius:4px; transition:0.5s;"></div></div>' +
            '<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">' +
                items.map(function(item) {
                    return '<span style="font-size:20px; opacity:' + (item.earned ? '1' : '0.3') + ';" title="' + (currentLang === 'ru' ? item.achievement.name_ru : item.achievement.name_en) + '">' + item.achievement.icon + '</span>';
                }).join('') +
            '</div></div>';
    }
    container.innerHTML = html;
}

// Загружаем тему при старте
document.addEventListener('DOMContentLoaded', function() { loadTheme(); });

// ============================================================
// ВИСЕЛИЦА (HANGMAN)
// ============================================================

var hangman = {
    word: '',
    display: [],
    guessed: [],
    attempts: 6,
    maxAttempts: 6,
    wins: 0,
    losses: 0,
    active: false,
    currentWordData: null
};

function loadHangmanStats() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (progress.hangman) {
        hangman.wins = progress.hangman.wins || 0;
        hangman.losses = progress.hangman.losses || 0;
    }
    updateHangmanStats();
}

function saveHangmanStats() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.hangman) progress.hangman = {};
    progress.hangman.wins = hangman.wins;
    progress.hangman.losses = hangman.losses;
    saveProgress(currentUser, progress);
}

function updateHangmanStats() {
    var winsEl = document.getElementById('hangmanWins');
    var lossesEl = document.getElementById('hangmanLosses');
    var attemptsEl = document.getElementById('hangmanAttempts');
    if (winsEl) winsEl.textContent = hangman.wins;
    if (lossesEl) lossesEl.textContent = hangman.losses;
    if (attemptsEl) attemptsEl.textContent = hangman.attempts;
}

function createHangmanKeyboard() {
    var container = document.getElementById('hangmanKeyboard');
    if (!container) return;
    
    var html = '';
    
    // === ХИРАГАНА (основная) ===
    html += '<div style="display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin-bottom:4px;">';
    html += '<div style="width:100%; text-align:center; color:#6c6e8a; font-size:10px; margin-bottom:2px;">ひらがな</div>';
    var hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    for (var i = 0; i < hiragana.length; i++) {
        var char = hiragana[i];
        html += '<button class="hangman-key" data-char="' + char + '" onclick="hangmanGuess(\'' + char + '\')" style="width:32px; height:32px; border-radius:6px; border:1px solid #2a2a4a; background:#0f0e17; color:#fffffe; font-size:16px; font-weight:700; cursor:pointer; transition:0.3s;" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'#2a2a4a\'">' + char + '</button>';
    }
    html += '</div>';
    
    // === ХИРАГАНА (маленькие + дакутэн/хандакутэн) ===
    html += '<div style="display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin-bottom:4px;">';
    html += '<div style="width:100%; text-align:center; color:#6c6e8a; font-size:10px; margin-bottom:2px;">ひらがな (小さい・濁音・半濁音)</div>';
    var hiraganaExtra = [
        // Маленькие
        'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
        'ゃ', 'ゅ', 'ょ', 'っ',
        // Дакутэн
        'が', 'ぎ', 'ぐ', 'げ', 'ご',
        'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
        'だ', 'ぢ', 'づ', 'で', 'ど',
        'ば', 'び', 'ぶ', 'べ', 'ぼ',
        // Хандакутэн
        'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
    ];
    for (var i = 0; i < hiraganaExtra.length; i++) {
        var char = hiraganaExtra[i];
        html += '<button class="hangman-key" data-char="' + char + '" onclick="hangmanGuess(\'' + char + '\')" style="width:32px; height:32px; border-radius:6px; border:1px solid #2a2a4a; background:#0f0e17; color:#fffffe; font-size:16px; font-weight:700; cursor:pointer; transition:0.3s;" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'#2a2a4a\'">' + char + '</button>';
    }
    html += '</div>';
    
    // === КАТАКАНА (основная) ===
    html += '<div style="display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin-bottom:4px;">';
    html += '<div style="width:100%; text-align:center; color:#6c6e8a; font-size:10px; margin-bottom:2px;">カタカナ</div>';
    var katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    for (var i = 0; i < katakana.length; i++) {
        var char = katakana[i];
        html += '<button class="hangman-key" data-char="' + char + '" onclick="hangmanGuess(\'' + char + '\')" style="width:32px; height:32px; border-radius:6px; border:1px solid #2a2a4a; background:#0f0e17; color:#fffffe; font-size:16px; font-weight:700; cursor:pointer; transition:0.3s;" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'#2a2a4a\'">' + char + '</button>';
    }
    html += '</div>';
    
    // === КАТАКАНА (маленькие + дакутэн/хандакутэн + удлинение) ===
    html += '<div style="display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin-bottom:4px;">';
    html += '<div style="width:100%; text-align:center; color:#6c6e8a; font-size:10px; margin-bottom:2px;">カタカナ (小さい・濁音・半濁音・長音)</div>';
    var katakanaExtra = [
        // Удлинение
        'ー',
        // Маленькие
        'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
        'ャ', 'ュ', 'ョ', 'ッ',
        // Дакутэн
        'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
        'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
        'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
        'バ', 'ビ', 'ブ', 'ベ', 'ボ',
        // Хандакутэн
        'パ', 'ピ', 'プ', 'ペ', 'ポ'
    ];
    for (var i = 0; i < katakanaExtra.length; i++) {
        var char = katakanaExtra[i];
        html += '<button class="hangman-key" data-char="' + char + '" onclick="hangmanGuess(\'' + char + '\')" style="width:32px; height:32px; border-radius:6px; border:1px solid #2a2a4a; background:#0f0e17; color:#fffffe; font-size:16px; font-weight:700; cursor:pointer; transition:0.3s;" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'#2a2a4a\'">' + char + '</button>';
    }
    html += '</div>';
    
    container.innerHTML = html;
}

function startHangman() {
    // Фильтруем слова без кандзи
    var cleanWords = [];
    if (typeof HANGMAN_WORDS !== 'undefined' && HANGMAN_WORDS.length > 0) {
        cleanWords = HANGMAN_WORDS.filter(function(item) {
            var kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
            return !kanjiRegex.test(item.word);
        });
    }
    
    // Если нет слов — используем VOCAB_DATA напрямую
    if (cleanWords.length === 0 && typeof VOCAB_DATA !== 'undefined') {
        for (var i = 0; i < VOCAB_DATA.length; i++) {
            var word = VOCAB_DATA[i];
            var kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
            if (!kanjiRegex.test(word.word) && word.word.length <= 8 && word.word.length >= 2) {
                cleanWords.push({
                    word: word.word,
                    reading: word.reading,
                    meaning_ru: word.meaning_ru,
                    meaning_en: word.meaning_en,
                    type: word.type
                });
            }
            if (cleanWords.length >= 50) break;
        }
    }
    
    if (cleanWords.length === 0) {
        showNotification('⚠️', 'Нет слов для игры!', 'Попробуй позже');
        return;
    }
    
    var randomIndex = Math.floor(Math.random() * cleanWords.length);
    var wordData = cleanWords[randomIndex];
    
    hangman.word = wordData.word;
    hangman.currentWordData = wordData;
    hangman.display = wordData.word.split('').map(function() { return '_'; });
    hangman.guessed = [];
    hangman.attempts = hangman.maxAttempts;
    hangman.active = true;
    
    updateHangmanDisplay();
    updateHangmanStats();
    updateHangmanCanvas();
    resetHangmanKeys();
    
    var hint = currentLang === 'ru' ? wordData.meaning_ru : wordData.meaning_en;
    var hintEl = document.getElementById('hangmanHint');
    if (hintEl) {
        hintEl.textContent = '💡 Подсказка: ' + hint;
    }
    
    showNotification('🎮', 'Новое слово!', 'Угадай японское слово');
}

function updateHangmanDisplay() {
    var displayEl = document.getElementById('hangmanWord');
    if (!displayEl) return;
    displayEl.textContent = hangman.display.join(' ');
}

function updateHangmanCanvas() {
    var parts = ['Head', 'Body', 'LeftArm', 'RightArm', 'LeftLeg', 'RightLeg'];
    var attemptsLeft = hangman.attempts;
    var visibleParts = hangman.maxAttempts - attemptsLeft;
    
    for (var i = 0; i < parts.length; i++) {
        var el = document.getElementById('hangman' + parts[i]);
        if (el) {
            el.style.opacity = (i < visibleParts) ? '1' : '0';
            el.style.stroke = (i < visibleParts) ? '#e94560' : '#6c6e8a';
        }
    }
}

function resetHangmanKeys() {
    document.querySelectorAll('.hangman-key').forEach(function(btn) {
        btn.disabled = false;
        btn.style.background = '#0f0e17';
        btn.style.color = '#fffffe';
        btn.style.borderColor = '#2a2a4a';
    });
}

function hangmanGuess(char) {
    if (!hangman.active) {
        showNotification('⚠️', 'Игра не начата!', 'Нажми "Новое слово"');
        return;
    }
    
    if (hangman.guessed.indexOf(char) !== -1) {
        showNotification('🔁', 'Ты уже угадал эту букву!', '');
        return;
    }
    
    if (hangman.attempts <= 0) {
        showNotification('💀', 'Игра окончена!', 'Нажми "Новое слово"');
        return;
    }
    
    hangman.guessed.push(char);
    
    document.querySelectorAll('.hangman-key').forEach(function(btn) {
        if (btn.dataset.char === char) {
            btn.disabled = true;
        }
    });
    
    var wordChars = hangman.word.split('');
    var found = false;
    
    for (var i = 0; i < wordChars.length; i++) {
        if (wordChars[i] === char) {
            hangman.display[i] = char;
            found = true;
        }
    }
    
    if (!found) {
        hangman.attempts--;
        if (typeof playSound === 'function') playSound('wrong');
        updateHangmanCanvas();
        showNotification('❌', 'Нет такой буквы!', 'Осталось попыток: ' + hangman.attempts);
    } else {
        if (typeof playSound === 'function') playSound('correct');
        showNotification('✅', 'Есть такая буква!', 'Продолжай!');
    }
    
    updateHangmanDisplay();
    updateHangmanStats();
    
    // Проверка победы
    if (hangman.display.indexOf('_') === -1) {
        hangman.active = false;
        hangman.wins++;
        saveHangmanStats();
        updateHangmanStats();
        if (typeof playSound === 'function') playSound('levelup');
        showNotification('🎉', 'ПОБЕДА!', 'Ты угадал слово: ' + hangman.word);
        
        if (currentUser) {
            var progress = getProgress(currentUser);
            progress.xp = (progress.xp || 0) + 15;
            saveProgress(currentUser, progress);
            if (typeof updateProfile === 'function') updateProfile();
            if (typeof updateUI === 'function') updateUI();
        }
        
        document.querySelectorAll('.hangman-key').forEach(function(btn) {
            if (hangman.word.indexOf(btn.dataset.char) !== -1) {
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                btn.style.borderColor = '#2E7D32';
            }
        });
        return;
    }
    
    // Проверка поражения
    if (hangman.attempts <= 0) {
        hangman.active = false;
        hangman.losses++;
        saveHangmanStats();
        updateHangmanStats();
        if (typeof playSound === 'function') playSound('wrong');
        showNotification('💀', 'ПОРАЖЕНИЕ!', 'Загаданное слово: ' + hangman.word);
        
        document.querySelectorAll('.hangman-key').forEach(function(btn) {
            if (hangman.word.indexOf(btn.dataset.char) !== -1) {
                btn.style.background = '#f44336';
                btn.style.color = 'white';
                btn.style.borderColor = '#c62828';
            }
        });
    }
}

function resetHangmanStats() {
    if (!currentUser) {
        showNotification('🔐', 'Войди в аккаунт!', '');
        return;
    }
    
    if (confirm(currentLang === 'ru' ? 'Сбросить счёт побед/поражений?' : 'Reset win/loss count?')) {
        hangman.wins = 0;
        hangman.losses = 0;
        saveHangmanStats();
        updateHangmanStats();
        showNotification('📊', 'Статистика сброшена!', '');
    }
}

function initHangman() {
    createHangmanKeyboard();
    loadHangmanStats();
    
    // Берём первое слово без кандзи
    var cleanWords = [];
    if (typeof HANGMAN_WORDS !== 'undefined' && HANGMAN_WORDS.length > 0) {
        cleanWords = HANGMAN_WORDS.filter(function(item) {
            var kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
            return !kanjiRegex.test(item.word);
        });
    }
    
    if (cleanWords.length === 0 && typeof VOCAB_DATA !== 'undefined') {
        for (var i = 0; i < VOCAB_DATA.length; i++) {
            var word = VOCAB_DATA[i];
            var kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
            if (!kanjiRegex.test(word.word) && word.word.length <= 8 && word.word.length >= 2) {
                cleanWords.push({
                    word: word.word,
                    reading: word.reading,
                    meaning_ru: word.meaning_ru,
                    meaning_en: word.meaning_en,
                    type: word.type
                });
            }
            if (cleanWords.length >= 20) break;
        }
    }
    
    if (cleanWords.length > 0) {
        var wordData = cleanWords[0];
        hangman.word = wordData.word;
        hangman.display = wordData.word.split('').map(function() { return '_'; });
        hangman.attempts = hangman.maxAttempts;
        hangman.active = true;
        updateHangmanDisplay();
        updateHangmanStats();
        var hintEl = document.getElementById('hangmanHint');
        if (hintEl) {
            hintEl.textContent = '💡 Подсказка: ' + (currentLang === 'ru' ? wordData.meaning_ru : wordData.meaning_en);
        }
    } else {
        var hintEl = document.getElementById('hangmanHint');
        if (hintEl) hintEl.textContent = '⚠️ Нет слов для игры. Добавь слова в словарь!';
    }
}

// Экспорт
window.hangman = hangman;
window.loadHangmanStats = loadHangmanStats;
window.saveHangmanStats = saveHangmanStats;
window.updateHangmanStats = updateHangmanStats;
window.createHangmanKeyboard = createHangmanKeyboard;
window.startHangman = startHangman;
window.hangmanGuess = hangmanGuess;
window.resetHangmanStats = resetHangmanStats;
window.updateHangmanDisplay = updateHangmanDisplay;
window.updateHangmanCanvas = updateHangmanCanvas;
window.resetHangmanKeys = resetHangmanKeys;
window.initHangman = initHangman;

console.log('✅ Виселица загружена!');