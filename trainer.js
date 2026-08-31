// ============================================================
// TRAINER — Все тренажёры
// ============================================================

// ============================================================
// 1. ТРЕНАЖЁР АЗБУКИ
// ============================================================

var trainerInitialized = false;
var currentKanji = '', correctAnswer = '', optionsArray = [];
var correctCount = 0, wrongCount = 0, totalAnswers = 0;
var isAnswered = false;
var currentPool = ALL_FULL_HIRAGANA;

var kanjiDisplay = document.getElementById('kanjiDisplay');
var optionBtns = document.querySelectorAll('#optionsContainer .option-btn');
var messageEl = document.getElementById('message');
var correctSpan = document.getElementById('correctCount');
var wrongSpan = document.getElementById('wrongCount');
var totalSpan = document.getElementById('totalCount');
var resetBtn = document.getElementById('resetBtn');

if (kanjiDisplay) {
    kanjiDisplay.addEventListener('click', function() { if (currentKanji) speakChar(currentKanji); });
}

function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function syncTrainerFromProfile() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (progress) {
        correctCount = progress.correct || 0;
        wrongCount = progress.wrong || 0;
        totalAnswers = progress.total || 0;
        updateStats();
    }
}

function saveTrainerProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    var today = new Date().toDateString();
    
    if (progress.todayDate !== today) {
        progress.todayStats = { correct: 0, total: 0, xp: 0, learned: 0 };
        progress.todayDate = today;
    }
    
    progress.total = totalAnswers;
    progress.correct = correctCount;
    progress.wrong = wrongCount;
    
    var xpPer20 = Math.floor(correctCount / 20);
    if (xpPer20 > (progress.lastXPCheck || 0)) {
        var earnedXP = (xpPer20 - (progress.lastXPCheck || 0)) * XP_PER_20_CORRECT;
        progress.xp = (progress.xp || 0) + earnedXP;
        progress.lastXPCheck = xpPer20;
        progress.todayStats.xp = (progress.todayStats.xp || 0) + earnedXP;
        if (earnedXP > 0) {
            showNotification('⭐', '+'+earnedXP+' XP', (currentLang === 'ru' ? 'За' : 'For') + ' ' + ((xpPer20 - (progress.lastXPCheck || 0)) * 20) + ' ' + (currentLang === 'ru' ? 'правильных ответов' : 'correct answers'));
        }
    }
    
    progress.todayStats.total = (progress.todayStats.total || 0) + 1;
    if (correctCount > 0) {
        progress.todayStats.correct = (progress.todayStats.correct || 0) + 1;
    }
    
    saveProgress(currentUser, progress);
    updateProfile();
    updateQuestsUI();
    updateUI();
    if (typeof updateHomeStats === 'function') updateHomeStats();
}

function loadNewQuestion() {
    if (!optionBtns.length) return;
    isAnswered = false;
    optionBtns.forEach(function(btn) {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    if (messageEl) { messageEl.textContent = ''; messageEl.className = 'message'; }

    var pool = getFilteredPool();
    if (pool.length === 0) pool = getAllCharsForMode();
    if (pool.length === 0) pool = ALL_FULL_HIRAGANA;

    var randomIndex = Math.floor(Math.random() * pool.length);
    var char = pool[randomIndex];
    var data;
    if (FULL_HIRAGANA[char]) data = FULL_HIRAGANA[char];
    else if (FULL_KATAKANA[char]) data = FULL_KATAKANA[char];
    else data = ['?', '?', '?', '?'];
    currentKanji = char;
    correctAnswer = data[0];
    optionsArray = data.slice();
    shuffleArray(optionsArray);
    if (kanjiDisplay) kanjiDisplay.textContent = currentKanji;
    optionBtns.forEach(function(btn, index) {
        var val = optionsArray[index] || '?';
        btn.textContent = val;
        btn.dataset.correct = (val === correctAnswer) ? 'true' : 'false';
    });
}

function handleOptionClick(e) {
    var btn = e.currentTarget;
    if (isAnswered || btn.disabled) return;
    var isCorrect = btn.dataset.correct === 'true';
    optionBtns.forEach(function(b) {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else b.classList.add('wrong');
    });
    if (isCorrect) {
        playSound('correct');
        if (messageEl) { messageEl.textContent = '✅ ' + (currentLang === 'ru' ? 'Отлично!' : 'Great!'); messageEl.className = 'message correct-msg'; }
        speakChar(currentKanji);
        correctCount++;
    } else {
        playSound('wrong');
        if (messageEl) { messageEl.textContent = '❌ ' + (currentLang === 'ru' ? 'Правильно' : 'Correct') + ': ' + correctAnswer; messageEl.className = 'message wrong-msg'; }
        speakChar(currentKanji);
        wrongCount++;
    }
    totalAnswers++;
    updateStats();
    saveTrainerProgress();
    if (isCorrect && currentUser) checkAllQuestsOnLoad();
    isAnswered = true;
    setTimeout(function() { loadNewQuestion(); }, 600);
}

function updateStats() {
    if (correctSpan) correctSpan.textContent = correctCount;
    if (wrongSpan) wrongSpan.textContent = wrongCount;
    if (totalSpan) totalSpan.textContent = totalAnswers;
}

function resetGame() {
    correctCount = 0; wrongCount = 0; totalAnswers = 0;
    updateStats();
    if (messageEl) { messageEl.textContent = '🔄 ' + (currentLang === 'ru' ? 'Заново!' : 'Restart!'); messageEl.className = 'message'; }
    if (currentUser) {
        var progress = getProgress(currentUser);
        progress.total = 0; progress.correct = 0; progress.wrong = 0; progress.lastXPCheck = 0;
        saveProgress(currentUser, progress);
        updateProfile();
    }
    loadNewQuestion();
}

function initTrainer() {
    if (trainerInitialized) return;
    if (optionBtns.length) { optionBtns.forEach(function(btn) { btn.addEventListener('click', handleOptionClick); }); }
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    syncTrainerFromProfile();
    loadNewQuestion();
    trainerInitialized = true;
    renderFilterPanel();
}

// ============================================================
// 2. ТРЕНАЖЁР КАНДЗИ
// ============================================================

var kanjiCorrect = 0, kanjiWrong = 0, kanjiTotal = 0;
var kanjiLearned = {}, kanjiStreak = {};
var kanjiTrainQueue = [], kanjiTrainIndex = 0;
var currentKanjiChar = '', kanjiAnswered = false;

function loadKanjiProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (progress.kanji) {
        kanjiLearned = progress.kanji.learned || {};
        kanjiStreak = progress.kanji.streak || {};
        kanjiCorrect = progress.kanji.correct || 0;
        kanjiWrong = progress.kanji.wrong || 0;
        kanjiTotal = progress.kanji.total || 0;
    } else {
        kanjiLearned = {}; kanjiStreak = {};
        kanjiCorrect = 0; kanjiWrong = 0; kanjiTotal = 0;
    }
    updateKanjiStats();
}

function saveKanjiProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.kanji) progress.kanji = {};
    progress.kanji.learned = kanjiLearned;
    progress.kanji.streak = kanjiStreak;
    progress.kanji.correct = kanjiCorrect;
    progress.kanji.wrong = kanjiWrong;
    progress.kanji.total = kanjiTotal;
    saveProgress(currentUser, progress);
}

function shuffleKanjiQueue() {
    var allIds = getKanjiFilteredPool();
    kanjiTrainQueue = allIds.length === 0 ? getAllKanjiChars() : allIds;
    for (var i = kanjiTrainQueue.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = kanjiTrainQueue[i];
        kanjiTrainQueue[i] = kanjiTrainQueue[j];
        kanjiTrainQueue[j] = temp;
    }
    kanjiTrainIndex = 0;
}

function loadKanjiQuestion() {
    if (kanjiTrainQueue.length === 0 || kanjiTrainIndex >= kanjiTrainQueue.length) {
        shuffleKanjiQueue();
        kanjiTrainIndex = 0;
    }
    var id = kanjiTrainQueue[kanjiTrainIndex];
    var data = KANJI_DATA.find(function(item) { return item.kanji === id; });
    if (!data) { shuffleKanjiQueue(); kanjiTrainIndex = 0; return loadKanjiQuestion(); }
    currentKanjiChar = id;
    var displayEl = document.getElementById('kanjiDisplayTrain');
    if (displayEl) displayEl.textContent = id;
    
    var correct = data.readings;
    var allReadings = KANJI_DATA.map(function(item) { return item.readings; }).filter(function(r) { return r !== correct; });
    var shuffled = allReadings.sort(function() { return Math.random() - 0.5; });
    var wrongs = shuffled.slice(0, 3);
    var options = [correct].concat(wrongs);
    for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }
    var btns = document.querySelectorAll('#kanjiOptions .option-btn');
    btns.forEach(function(btn, index) {
        btn.textContent = options[index] || '?';
        btn.dataset.correct = (options[index] === correct) ? 'true' : 'false';
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    var meaning = getKanjiMeaning(data);
    var questionEl = document.getElementById('kanjiQuestion');
    if (questionEl) {
        questionEl.textContent = (currentLang === 'ru' ? 'Выбери чтение для' : 'Choose reading for') + ': ' + id + ' (' + meaning + ')';
    }
    var msgEl = document.getElementById('kanjiMessage');
    if (msgEl) { msgEl.textContent = ''; msgEl.className = 'message'; }
    kanjiAnswered = false;
}

function handleKanjiAnswer(e) {
    var btn = e.currentTarget;
    if (kanjiAnswered || btn.disabled) return;
    var isCorrect = btn.dataset.correct === 'true';
    var btns = document.querySelectorAll('#kanjiOptions .option-btn');
    btns.forEach(function(b) {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else b.classList.add('wrong');
    });
    var msg = document.getElementById('kanjiMessage');
    var data = KANJI_DATA.find(function(item) { return item.kanji === currentKanjiChar; });
    if (isCorrect) {
        playSound('correct');
        kanjiCorrect++;
        if (msg) { msg.textContent = '✅ ' + (currentLang === 'ru' ? 'Правильно' : 'Correct') + '! ' + currentKanjiChar + ' → ' + data.readings; msg.className = 'message correct-msg'; }
        speakChar(currentKanjiChar);
        kanjiStreak[currentKanjiChar] = (kanjiStreak[currentKanjiChar] || 0) + 1;
        if (kanjiStreak[currentKanjiChar] >= 3) {
            kanjiLearned[currentKanjiChar] = true;
            var meaning = getKanjiMeaning(data);
            showNotification('🎉', (currentLang === 'ru' ? 'Выучен кандзи' : 'Learned kanji') + ': ' + currentKanjiChar + '!', meaning + ' — ' + data.readings);
        }
    } else {
        playSound('wrong');
        kanjiWrong++;
        kanjiStreak[currentKanjiChar] = 0;
        if (msg) { msg.textContent = '❌ ' + (currentLang === 'ru' ? 'Неверно. Правильно' : 'Wrong. Correct') + ': ' + data.readings + ' (' + getKanjiMeaning(data) + ')'; msg.className = 'message wrong-msg'; }
        speakChar(currentKanjiChar);
    }
    kanjiTotal++;
    kanjiAnswered = true;
    kanjiTrainIndex++;
    document.getElementById('kanjiCorrect').textContent = kanjiCorrect;
    document.getElementById('kanjiWrong').textContent = kanjiWrong;
    document.getElementById('kanjiTotal').textContent = kanjiTotal;
    saveKanjiProgress();
    updateKanjiStats();
    renderKanjiList();
    setTimeout(function() { loadKanjiQuestion(); }, 1200);
}

function initKanjiTrainer() {
    var btns = document.querySelectorAll('#kanjiOptions .option-btn');
    btns.forEach(function(btn) { btn.addEventListener('click', handleKanjiAnswer); });
    var resetBtnEl = document.getElementById('kanjiResetBtn');
    if (resetBtnEl) {
        resetBtnEl.addEventListener('click', function() {
            kanjiCorrect = 0; kanjiWrong = 0; kanjiTotal = 0;
            kanjiStreak = {}; kanjiLearned = {};
            saveKanjiProgress();
            updateKanjiStats();
            renderKanjiList();
            shuffleKanjiQueue();
            kanjiTrainIndex = 0;
            loadKanjiQuestion();
            showNotification('🔄', currentLang === 'ru' ? 'Прогресс кандзи сброшен' : 'Kanji progress reset', '');
        });
    }
    renderKanjiFilterPanel();
    shuffleKanjiQueue();
    loadKanjiQuestion();
    loadKanjiProgress();
}

function updateKanjiStats() {
    var total = KANJI_DATA.length;
    var learned = Object.keys(kanjiLearned).filter(function(k) { return kanjiLearned[k]; }).length;
    document.getElementById('kanjiTotalCount').textContent = total;
    document.getElementById('kanjiLearnedCount').textContent = learned;
    var percent = Math.round((learned / total) * 100);
    document.getElementById('kanjiProgressPercent').textContent = percent + '%';
    document.getElementById('kanjiProgressBar').style.width = percent + '%';
    document.getElementById('kanjiCorrect').textContent = kanjiCorrect;
    document.getElementById('kanjiWrong').textContent = kanjiWrong;
    document.getElementById('kanjiTotal').textContent = kanjiTotal;
}

function renderKanjiList(filter) {
    var grid = document.getElementById('kanjiGrid');
    if (!grid) return;
    var filteredData = KANJI_DATA;
    if (currentKanjiGroup !== 'all') {
        var groupChars = KANJI_GROUPS[currentKanjiGroup] || [];
        filteredData = filteredData.filter(function(item) { return groupChars.indexOf(item.kanji) !== -1; });
    }
    if (filter) {
        var query = filter.toLowerCase();
        filteredData = filteredData.filter(function(item) {
            var kanji = item.kanji;
            var readings = item.readings.toLowerCase();
            var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
            return kanji.indexOf(query) !== -1 || readings.indexOf(query) !== -1 || meaning.indexOf(query) !== -1;
        });
    }
    var html = '';
    filteredData.forEach(function(item) {
        var id = item.kanji;
        var learned = kanjiLearned[id] || false;
        var streak = kanjiStreak[id] || 0;
        var meaning = getKanjiMeaning(item);
        html += '<div style="background:' + (learned ? '#1a3a2e' : '#1a1a2e') + ';border:1px solid ' + (learned ? '#4CAF50' : '#2a2a4a') + ';border-radius:10px;padding:8px 4px;text-align:center;transition:0.3s;cursor:pointer;" onclick="speakChar(\'' + id + '\')" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'' + (learned ? '#4CAF50' : '#2a2a4a') + '\'">' +
                    '<div style="font-size:28px;font-weight:700;color:#fffffe;">' + id + '</div>' +
                    '<div style="font-size:10px;color:#a7a9be;margin-top:2px;">' + meaning + '</div>' +
                    '<div style="font-size:9px;color:#e94560;margin-top:1px;">🇯🇵 ' + item.readings + '</div>' +
                    (learned ? '<div style="color:#4CAF50;font-size:9px;margin-top:2px;">✅ ' + (currentLang === 'ru' ? 'Выучено' : 'Learned') + '</div>' : '') +
                    (streak > 0 ? '<div style="color:#e94560;font-size:8px;margin-top:1px;">🔥 streak: ' + streak + '</div>' : '') +
                '</div>';
    });
    grid.innerHTML = html;
    updateKanjiStats();
}

function filterKanjiList(query) { renderKanjiList(query); }

// ============================================================
// 3. ТРЕНАЖЁР ГРАММАТИКИ
// ============================================================

var grammarCorrect = 0, grammarWrong = 0, grammarTotal = 0;
var grammarCompleted = {}, grammarStreak = {};
var grammarTrainQueue = [], grammarTrainIndex = 0;
var currentGrammarId = '', grammarAnswered = false;

function loadGrammarProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (progress.grammar) {
        grammarCompleted = progress.grammar.completed || {};
        grammarStreak = progress.grammar.streak || {};
        grammarCorrect = progress.grammar.correct || 0;
        grammarWrong = progress.grammar.wrong || 0;
        grammarTotal = progress.grammar.total || 0;
    } else {
        grammarCompleted = {}; grammarStreak = {};
        grammarCorrect = 0; grammarWrong = 0; grammarTotal = 0;
    }
    updateGrammarStats();
}

function saveGrammarProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.grammar) progress.grammar = {};
    progress.grammar.completed = grammarCompleted;
    progress.grammar.streak = grammarStreak;
    progress.grammar.correct = grammarCorrect;
    progress.grammar.wrong = grammarWrong;
    progress.grammar.total = grammarTotal;
    saveProgress(currentUser, progress);
}

function renderGrammarList(filter) {
    var grid = document.getElementById('grammarGrid');
    if (!grid) return;
    var filteredData = GRAMMAR_DATA;
    if (filter) {
        var query = filter.toLowerCase();
        filteredData = GRAMMAR_DATA.filter(function(item) {
            var pattern = item.pattern.toLowerCase();
            var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
            var question = (currentLang === 'ru' ? item.question_ru : item.question_en).toLowerCase();
            var answer = item.answer.toLowerCase();
            return pattern.indexOf(query) !== -1 || meaning.indexOf(query) !== -1 || question.indexOf(query) !== -1 || answer.indexOf(query) !== -1;
        });
    }
    var html = '';
    filteredData.forEach(function(item) {
        var id = item.id;
        var completed = grammarCompleted[id] || false;
        var streak = grammarStreak[id] || 0;
        var question = currentLang === 'ru' ? item.question_ru : item.question_en;
        var meaning = getGrammarMeaning(item);
        html += '<div style="background:' + (completed ? '#1a3a2e' : '#1a1a2e') + '; border:1px solid ' + (completed ? '#4CAF50' : '#2a2a4a') + '; border-radius:12px; padding:12px 10px; transition:0.3s;">' +
            '<div style="font-size:14px; color:#a7a9be;">' + item.pattern + '</div>' +
            '<div style="font-size:14px; color:#fffffe; margin-top:4px;">' + question + '</div>' +
            '<div style="font-size:12px; color:#6c6e8a; margin-top:2px;">' + meaning + '</div>' +
            (completed ? '<div style="color:#4CAF50; font-size:10px; margin-top:4px;">✅ ' + (currentLang === 'ru' ? 'Пройдено' : 'Completed') + '</div>' : '') +
            (streak > 0 ? '<div style="color:#e94560; font-size:9px; margin-top:2px;">🔥 streak: ' + streak + '</div>' : '') +
        '</div>';
    });
    grid.innerHTML = html;
    updateGrammarStats();
}

function filterGrammarList(query) { renderGrammarList(query); }

function shuffleGrammarQueue() {
    var allIds = GRAMMAR_DATA.map(function(item) { return item.id; });
    for (var i = allIds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = allIds[i];
        allIds[i] = allIds[j];
        allIds[j] = temp;
    }
    grammarTrainQueue = allIds;
    grammarTrainIndex = 0;
}

function loadGrammarQuestion() {
    if (grammarTrainQueue.length === 0 || grammarTrainIndex >= grammarTrainQueue.length) {
        shuffleGrammarQueue();
        grammarTrainIndex = 0;
    }
    var id = grammarTrainQueue[grammarTrainIndex];
    var data = GRAMMAR_DATA.find(function(item) { return item.id === id; });
    if (!data) { shuffleGrammarQueue(); grammarTrainIndex = 0; return loadGrammarQuestion(); }
    currentGrammarId = data.id;

    var question = currentLang === 'ru' ? data.question_ru : data.question_en;
    var meaning = getGrammarMeaning(data);

    var questionEl = document.getElementById('grammarQuestionText');
    if (questionEl) questionEl.textContent = question;
    var hintEl = document.getElementById('grammarHintText');
    if (hintEl) hintEl.textContent = meaning;

    var correct = data.answer;
    var options = data.options.slice();
    for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }
    var btns = document.querySelectorAll('#grammarOptions .option-btn');
    btns.forEach(function(btn, index) {
        btn.textContent = options[index] || '?';
        btn.dataset.correct = (options[index] === correct) ? 'true' : 'false';
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    var msgEl = document.getElementById('grammarMessage');
    if (msgEl) { msgEl.textContent = ''; msgEl.className = 'message'; }
    grammarAnswered = false;

    if (autoSpeakGrammarEnabled) {
        setTimeout(function() { speakGrammarSentence(); }, 300);
    }
}

function handleGrammarAnswer(e) {
    var btn = e.currentTarget;
    if (grammarAnswered || btn.disabled) return;
    var isCorrect = btn.dataset.correct === 'true';
    var btns = document.querySelectorAll('#grammarOptions .option-btn');
    btns.forEach(function(b) {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else b.classList.add('wrong');
    });
    var msg = document.getElementById('grammarMessage');
    var data = GRAMMAR_DATA.find(function(item) { return item.id === currentGrammarId; });
    if (isCorrect) {
        playSound('correct');
        grammarCorrect++;
        if (msg) { msg.textContent = '✅ ' + (currentLang === 'ru' ? 'Правильно!' : 'Correct!'); msg.className = 'message correct-msg'; }
        speakGrammarSentence();
        grammarStreak[currentGrammarId] = (grammarStreak[currentGrammarId] || 0) + 1;
        if (grammarStreak[currentGrammarId] >= 2) {
            grammarCompleted[currentGrammarId] = true;
            showNotification('🎉', (currentLang === 'ru' ? 'Тема пройдена' : 'Topic completed') + ': ' + data.pattern, '');
        }
    } else {
        playSound('wrong');
        grammarWrong++;
        grammarStreak[currentGrammarId] = 0;
        if (msg) { msg.textContent = '❌ ' + (currentLang === 'ru' ? 'Неверно. Правильно' : 'Wrong. Correct') + ': ' + data.answer; msg.className = 'message wrong-msg'; }
        speakGrammarSentence();
    }
    grammarTotal++;
    grammarAnswered = true;
    grammarTrainIndex++;
    document.getElementById('grammarCorrect').textContent = grammarCorrect;
    document.getElementById('grammarWrong').textContent = grammarWrong;
    document.getElementById('grammarTotal').textContent = grammarTotal;
    saveGrammarProgress();
    updateGrammarStats();
    renderGrammarList();
    setTimeout(function() { loadGrammarQuestion(); }, 1200);
}

function initGrammarTrainer() {
    var btns = document.querySelectorAll('#grammarOptions .option-btn');
    btns.forEach(function(btn) { btn.addEventListener('click', handleGrammarAnswer); });
    var resetBtnEl = document.getElementById('grammarResetBtn');
    if (resetBtnEl) {
        resetBtnEl.addEventListener('click', function() {
            grammarCorrect = 0; grammarWrong = 0; grammarTotal = 0;
            grammarStreak = {}; grammarCompleted = {};
            saveGrammarProgress();
            updateGrammarStats();
            renderGrammarList();
            shuffleGrammarQueue();
            grammarTrainIndex = 0;
            loadGrammarQuestion();
            showNotification('🔄', currentLang === 'ru' ? 'Прогресс грамматики сброшен' : 'Grammar progress reset', '');
        });
    }
    setupGrammarAutoSpeak();
    shuffleGrammarQueue();
    loadGrammarQuestion();
    loadGrammarProgress();
}

function updateGrammarStats() {
    var total = GRAMMAR_DATA.length;
    var completed = Object.keys(grammarCompleted).filter(function(k) { return grammarCompleted[k]; }).length;
    document.getElementById('grammarTotalCount').textContent = total;
    document.getElementById('grammarCompletedCount').textContent = completed;
    var percent = Math.round((completed / total) * 100);
    document.getElementById('grammarProgressPercent').textContent = percent + '%';
    document.getElementById('grammarProgressBar').style.width = percent + '%';
    document.getElementById('grammarCorrect').textContent = grammarCorrect;
    document.getElementById('grammarWrong').textContent = grammarWrong;
    document.getElementById('grammarTotal').textContent = grammarTotal;
}

// ============================================================
// 4. ТРЕНАЖЁР СЛОВ
// ============================================================

var vocabCorrect = 0, vocabWrong = 0, vocabTotal = 0;
var vocabLearned = {}, vocabStreak = {};
var vocabTrainQueue = [], vocabTrainIndex = 0;
var currentVocabWord = '', vocabAnswered = false;

function loadVocabProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (progress.vocab) {
        vocabLearned = progress.vocab.learned || {};
        vocabStreak = progress.vocab.streak || {};
        vocabCorrect = progress.vocab.correct || 0;
        vocabWrong = progress.vocab.wrong || 0;
        vocabTotal = progress.vocab.total || 0;
    } else {
        vocabLearned = {}; vocabStreak = {};
        vocabCorrect = 0; vocabWrong = 0; vocabTotal = 0;
    }
    updateVocabStats();
}

function saveVocabProgress() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.vocab) progress.vocab = {};
    progress.vocab.learned = vocabLearned;
    progress.vocab.streak = vocabStreak;
    progress.vocab.correct = vocabCorrect;
    progress.vocab.wrong = vocabWrong;
    progress.vocab.total = vocabTotal;
    saveProgress(currentUser, progress);
}

function renderVocabList(filter) {
    var grid = document.getElementById('vocabGrid');
    if (!grid) return;
    var filteredData = VOCAB_DATA;
    if (filter) {
        var query = filter.toLowerCase();
        filteredData = VOCAB_DATA.filter(function(item) {
            var word = item.word;
            var reading = item.reading.toLowerCase();
            var meaning = (currentLang === 'ru' ? item.meaning_ru : item.meaning_en).toLowerCase();
            var type = item.type.toLowerCase();
            return word.indexOf(query) !== -1 || reading.indexOf(query) !== -1 || meaning.indexOf(query) !== -1 || type.indexOf(query) !== -1;
        });
    }
    var html = '';
    filteredData.forEach(function(item) {
        var id = item.word;
        var learned = vocabLearned[id] || false;
        var streak = vocabStreak[id] || 0;
        var meaning = getVocabMeaning(item);
        html += '<div style="background:' + (learned ? '#1a3a2e' : '#1a1a2e') + '; border:1px solid ' + (learned ? '#4CAF50' : '#2a2a4a') + '; border-radius:10px; padding:10px 8px; text-align:center; transition:0.3s; cursor:pointer;" onclick="speakChar(\'' + id + '\')" onmouseenter="this.style.borderColor=\'#e94560\'" onmouseleave="this.style.borderColor=\'' + (learned ? '#4CAF50' : '#2a2a4a') + '\'">' +
            '<div style="font-size:20px; font-weight:700; color:#e94560;">' + item.word + '</div>' +
            '<div style="font-size:12px; color:#a7a9be; margin-top:2px;">' + item.reading + '</div>' +
            '<div style="font-size:12px; color:#fffffe; margin-top:2px;">' + meaning + '</div>' +
            '<div style="font-size:10px; color:#6c6e8a; margin-top:1px;">' + item.type + '</div>' +
            (learned ? '<div style="color:#4CAF50; font-size:10px; margin-top:3px;">✅ ' + (currentLang === 'ru' ? 'Выучено' : 'Learned') + '</div>' : '') +
            (streak > 0 ? '<div style="color:#e94560; font-size:9px; margin-top:1px;">🔥 streak: ' + streak + '</div>' : '') +
        '</div>';
    });
    grid.innerHTML = html;
    updateVocabStats();
}

function filterVocabList(query) { renderVocabList(query); }

function shuffleVocabQueue() {
    var allIds = VOCAB_DATA.map(function(item) { return item.word; });
    for (var i = allIds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = allIds[i];
        allIds[i] = allIds[j];
        allIds[j] = temp;
    }
    vocabTrainQueue = allIds;
    vocabTrainIndex = 0;
}

function loadVocabQuestion() {
    if (vocabTrainQueue.length === 0 || vocabTrainIndex >= vocabTrainQueue.length) {
        shuffleVocabQueue();
        vocabTrainIndex = 0;
    }
    var id = vocabTrainQueue[vocabTrainIndex];
    var data = VOCAB_DATA.find(function(item) { return item.word === id; });
    if (!data) { shuffleVocabQueue(); vocabTrainIndex = 0; return loadVocabQuestion(); }
    currentVocabWord = id;
    var displayEl = document.getElementById('vocabDisplay');
    if (displayEl) displayEl.textContent = id;
    var readingEl = document.getElementById('vocabReading');
    if (readingEl) readingEl.textContent = data.reading;

    var correct = getVocabMeaning(data);
    var allMeanings = VOCAB_DATA.map(function(item) { return getVocabMeaning(item); }).filter(function(m) { return m !== correct; });
    var shuffled = allMeanings.sort(function() { return Math.random() - 0.5; });
    var wrongs = shuffled.slice(0, 3);
    var options = [correct].concat(wrongs);
    for (var i = options.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = options[i];
        options[i] = options[j];
        options[j] = temp;
    }
    var btns = document.querySelectorAll('#vocabOptions .option-btn');
    btns.forEach(function(btn, index) {
        btn.textContent = options[index] || '?';
        btn.dataset.correct = (options[index] === correct) ? 'true' : 'false';
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    var hintEl = document.getElementById('vocabHint');
    if (hintEl) hintEl.textContent = currentLang === 'ru' ? 'Выбери правильный перевод' : 'Choose the correct translation';
    var msgEl = document.getElementById('vocabMessage');
    if (msgEl) { msgEl.textContent = ''; msgEl.className = 'message'; }
    vocabAnswered = false;
}

function handleVocabAnswer(e) {
    var btn = e.currentTarget;
    if (vocabAnswered || btn.disabled) return;
    var isCorrect = btn.dataset.correct === 'true';
    var btns = document.querySelectorAll('#vocabOptions .option-btn');
    btns.forEach(function(b) {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        else b.classList.add('wrong');
    });
    var msg = document.getElementById('vocabMessage');
    var data = VOCAB_DATA.find(function(item) { return item.word === currentVocabWord; });
    var meaning = getVocabMeaning(data);
    if (isCorrect) {
        playSound('correct');
        vocabCorrect++;
        if (msg) { msg.textContent = '✅ ' + (currentLang === 'ru' ? 'Правильно!' : 'Correct!'); msg.className = 'message correct-msg'; }
        speakChar(currentVocabWord);
        vocabStreak[currentVocabWord] = (vocabStreak[currentVocabWord] || 0) + 1;
        if (vocabStreak[currentVocabWord] >= 3) {
            vocabLearned[currentVocabWord] = true;
            showNotification('🎉', (currentLang === 'ru' ? 'Выучено слово' : 'Learned word') + ': ' + currentVocabWord, meaning);
        }
    } else {
        playSound('wrong');
        vocabWrong++;
        vocabStreak[currentVocabWord] = 0;
        if (msg) { msg.textContent = '❌ ' + (currentLang === 'ru' ? 'Неверно. Правильно' : 'Wrong. Correct') + ': ' + meaning; msg.className = 'message wrong-msg'; }
        speakChar(currentVocabWord);
    }
    vocabTotal++;
    vocabAnswered = true;
    vocabTrainIndex++;
    document.getElementById('vocabCorrect').textContent = vocabCorrect;
    document.getElementById('vocabWrong').textContent = vocabWrong;
    document.getElementById('vocabTotal').textContent = vocabTotal;
    saveVocabProgress();
    updateVocabStats();
    renderVocabList();
    setTimeout(function() { loadVocabQuestion(); }, 1200);
}

function initVocabTrainer() {
    var btns = document.querySelectorAll('#vocabOptions .option-btn');
    btns.forEach(function(btn) { btn.addEventListener('click', handleVocabAnswer); });
    var resetBtnEl = document.getElementById('vocabResetBtn');
    if (resetBtnEl) {
        resetBtnEl.addEventListener('click', function() {
            vocabCorrect = 0; vocabWrong = 0; vocabTotal = 0;
            vocabStreak = {}; vocabLearned = {};
            saveVocabProgress();
            updateVocabStats();
            renderVocabList();
            shuffleVocabQueue();
            vocabTrainIndex = 0;
            loadVocabQuestion();
            showNotification('🔄', currentLang === 'ru' ? 'Прогресс слов сброшен' : 'Vocabulary progress reset', '');
        });
    }
    shuffleVocabQueue();
    loadVocabQuestion();
    loadVocabProgress();
}

function updateVocabStats() {
    var total = VOCAB_DATA.length;
    var learned = Object.keys(vocabLearned).filter(function(k) { return vocabLearned[k]; }).length;
    document.getElementById('vocabTotalCount').textContent = total;
    document.getElementById('vocabLearnedCount').textContent = learned;
    var percent = Math.round((learned / total) * 100);
    document.getElementById('vocabProgressPercent').textContent = percent + '%';
    document.getElementById('vocabProgressBar').style.width = percent + '%';
    document.getElementById('vocabCorrect').textContent = vocabCorrect;
    document.getElementById('vocabWrong').textContent = vocabWrong;
    document.getElementById('vocabTotal').textContent = vocabTotal;
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.trainerInitialized = trainerInitialized;
window.currentKanji = currentKanji;
window.correctAnswer = correctAnswer;
window.optionsArray = optionsArray;
window.correctCount = correctCount;
window.wrongCount = wrongCount;
window.totalAnswers = totalAnswers;
window.isAnswered = isAnswered;
window.currentPool = currentPool;
window.syncTrainerFromProfile = syncTrainerFromProfile;
window.saveTrainerProgress = saveTrainerProgress;
window.loadNewQuestion = loadNewQuestion;
window.handleOptionClick = handleOptionClick;
window.updateStats = updateStats;
window.resetGame = resetGame;
window.initTrainer = initTrainer;

window.kanjiCorrect = kanjiCorrect;
window.kanjiWrong = kanjiWrong;
window.kanjiTotal = kanjiTotal;
window.kanjiLearned = kanjiLearned;
window.kanjiStreak = kanjiStreak;
window.kanjiTrainQueue = kanjiTrainQueue;
window.kanjiTrainIndex = kanjiTrainIndex;
window.currentKanjiChar = currentKanjiChar;
window.kanjiAnswered = kanjiAnswered;
window.loadKanjiProgress = loadKanjiProgress;
window.saveKanjiProgress = saveKanjiProgress;
window.shuffleKanjiQueue = shuffleKanjiQueue;
window.loadKanjiQuestion = loadKanjiQuestion;
window.handleKanjiAnswer = handleKanjiAnswer;
window.initKanjiTrainer = initKanjiTrainer;
window.updateKanjiStats = updateKanjiStats;
window.renderKanjiList = renderKanjiList;

window.grammarCorrect = grammarCorrect;
window.grammarWrong = grammarWrong;
window.grammarTotal = grammarTotal;
window.grammarCompleted = grammarCompleted;
window.grammarStreak = grammarStreak;
window.grammarTrainQueue = grammarTrainQueue;
window.grammarTrainIndex = grammarTrainIndex;
window.currentGrammarId = currentGrammarId;
window.grammarAnswered = grammarAnswered;
window.loadGrammarProgress = loadGrammarProgress;
window.saveGrammarProgress = saveGrammarProgress;
window.renderGrammarList = renderGrammarList;
window.shuffleGrammarQueue = shuffleGrammarQueue;
window.loadGrammarQuestion = loadGrammarQuestion;
window.handleGrammarAnswer = handleGrammarAnswer;
window.initGrammarTrainer = initGrammarTrainer;
window.updateGrammarStats = updateGrammarStats;

window.vocabCorrect = vocabCorrect;
window.vocabWrong = vocabWrong;
window.vocabTotal = vocabTotal;
window.vocabLearned = vocabLearned;
window.vocabStreak = vocabStreak;
window.vocabTrainQueue = vocabTrainQueue;
window.vocabTrainIndex = vocabTrainIndex;
window.currentVocabWord = currentVocabWord;
window.vocabAnswered = vocabAnswered;
window.loadVocabProgress = loadVocabProgress;
window.saveVocabProgress = saveVocabProgress;
window.renderVocabList = renderVocabList;
window.shuffleVocabQueue = shuffleVocabQueue;
window.loadVocabQuestion = loadVocabQuestion;
window.handleVocabAnswer = handleVocabAnswer;
window.initVocabTrainer = initVocabTrainer;
window.updateVocabStats = updateVocabStats;

console.log('✅ trainer.js загружен!');