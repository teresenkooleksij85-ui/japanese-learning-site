// ============================================================
// MAIN — Точка входа
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadTheme === 'function') loadTheme();
    
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', function() { if (typeof logout === 'function') logout(); });
    
    var resetBtn = document.getElementById('resetQuestsBtn');
    if (resetBtn) resetBtn.addEventListener('click', function() { if (typeof resetDailyQuests === 'function') resetDailyQuests(); });

    var navLinks = document.querySelectorAll('.nav a[data-page]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof switchPage === 'function') switchPage(this.dataset.page);
        });
    });

    // Инициализация
    if (typeof renderAlphabetTable === 'function') renderAlphabetTable('hiragana');
    if (typeof loadKanjiProgress === 'function') loadKanjiProgress();
    if (typeof renderKanjiList === 'function') renderKanjiList();
    if (typeof renderKanjiFilterPanel === 'function') renderKanjiFilterPanel();
    if (typeof loadGrammarProgress === 'function') loadGrammarProgress();
    if (typeof renderGrammarList === 'function') renderGrammarList();
    if (typeof loadVocabProgress === 'function') loadVocabProgress();
    if (typeof renderVocabList === 'function') renderVocabList();
    if (typeof initTrainer === 'function') initTrainer();
    if (typeof initKanjiTrainer === 'function') initKanjiTrainer();
    if (typeof initGrammarTrainer === 'function') initGrammarTrainer();
    if (typeof initVocabTrainer === 'function') initVocabTrainer();
    if (typeof initHangman === 'function') initHangman();
    if (typeof loadMessages === 'function') loadMessages();

    // Восстановление сессии
    var savedUser = localStorage.getItem('nihongo_current_user');
    var users = typeof getUsers === 'function' ? getUsers() : {};
    if (savedUser && users[savedUser]) {
        currentUser = savedUser;
        document.getElementById('usernameDisplay').textContent = savedUser;
        document.getElementById('userDisplay').classList.remove('hidden');
        document.getElementById('logoutBtn').classList.remove('hidden');
        document.getElementById('authContainer').classList.add('hidden');
        if (typeof checkDailyQuests === 'function') checkDailyQuests();
        if (typeof updateDays === 'function') updateDays();
        if (typeof updateUI === 'function') updateUI();
        setTimeout(function() {
            if (typeof checkAllQuestsOnLoad === 'function') checkAllQuestsOnLoad();
            if (typeof checkAchievements === 'function') checkAchievements();
        }, 500);
    } else {
        document.getElementById('userDisplay').classList.remove('hidden');
        document.getElementById('usernameDisplay').textContent = (typeof currentLang !== 'undefined' && currentLang === 'ru') ? 'Гость' : 'Guest';
        document.getElementById('logoutBtn').classList.add('hidden');
        document.getElementById('authContainer').classList.remove('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    }

    if (typeof updateUI === 'function') updateUI();
    if (typeof updateHomeStats === 'function') updateHomeStats();
    if (typeof switchAchievementsTab === 'function') switchAchievementsTab('all');

    window.addEventListener('beforeunload', function() {
        if (typeof currentUser !== 'undefined' && currentUser) localStorage.setItem('nihongo_current_user', currentUser);
    });
    
    console.log('✅ main.js загружен!');
});

// ============================================================
// ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ
// ============================================================

// auth.js
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

// ui.js
window.currentLang = currentLang;
window.switchLanguage = switchLanguage;
window.updateAllTrainers = updateAllTrainers;
window.switchPage = switchPage;
window.showNotification = showNotification;
window.updateProfile = updateProfile;
window.updateQuestsUI = updateQuestsUI;
window.updateUI = updateUI;
window.showRewardedAd = showRewardedAd;
window.initRealAds = initRealAds;
window.showErrors = showErrors;
window.updateHomeStats = updateHomeStats;
window.playSound = playSound;
window.toggleSound = toggleSound;
window.globalSearch = globalSearch;
window.goToSearchResult = goToSearchResult;
window.filterKanjiList = filterKanjiList;
window.filterGrammarList = filterGrammarList;
window.filterVocabList = filterVocabList;
window.setTheme = setTheme;
window.loadTheme = loadTheme;
window.switchAchievementsTab = switchAchievementsTab;
window.renderAllAchievements = renderAllAchievements;
window.renderAchievementCategories = renderAchievementCategories;

// app.js
window.speakText = speakText;
window.speakChar = speakChar;
window.speakGrammarSentence = speakGrammarSentence;
window.setupGrammarAutoSpeak = setupGrammarAutoSpeak;
window.autoSpeakGrammarEnabled = autoSpeakGrammarEnabled;
window.checkDailyQuests = checkDailyQuests;
window.completeQuest = completeQuest;
window.checkAllQuestsOnLoad = checkAllQuestsOnLoad;
window.resetDailyQuests = resetDailyQuests;
window.filterState = filterState;
window.getCurrentRowGroups = getCurrentRowGroups;
window.getAllCharsForMode = getAllCharsForMode;
window.getFilteredPool = getFilteredPool;
window.renderFilterPanel = renderFilterPanel;
window.toggleRow = toggleRow;
window.toggleChar = toggleChar;
window.filterSelectAll = filterSelectAll;
window.filterSelectNone = filterSelectNone;
window.filterResetToDefault = filterResetToDefault;
window.updateTrainerPool = updateTrainerPool;
window.kanjiFilterState = kanjiFilterState;
window.getKanjiGroupName = getKanjiGroupName;
window.getAllKanjiChars = getAllKanjiChars;
window.getKanjiFilteredPool = getKanjiFilteredPool;
window.renderKanjiFilterPanel = renderKanjiFilterPanel;
window.toggleKanjiGroup = toggleKanjiGroup;
window.toggleKanjiChar = toggleKanjiChar;
window.kanjiFilterSelectAll = kanjiFilterSelectAll;
window.kanjiFilterSelectNone = kanjiFilterSelectNone;
window.kanjiFilterResetToDefault = kanjiFilterResetToDefault;
window.updateKanjiTrainerPool = updateKanjiTrainerPool;
window.renderAlphabetTable = renderAlphabetTable;
window.switchTable = switchTable;
window.filterKanjiByGroup = filterKanjiByGroup;
window.getKanjiMeaning = getKanjiMeaning;
window.switchKanjiTab = switchKanjiTab;
window.getGrammarMeaning = getGrammarMeaning;
window.switchGrammarTab = switchGrammarTab;
window.getVocabMeaning = getVocabMeaning;
window.switchVocabTab = switchVocabTab;

// trainer.js
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

// hangman
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

// guestbook.js
window.messages = messages;
window.loadMessages = loadMessages;
window.saveMessages = saveMessages;
window.sendMessage = sendMessage;
window.reactToMessage = reactToMessage;
window.deleteMessage = deleteMessage;
window.toggleReplyForm = toggleReplyForm;
window.renderMessages = renderMessages;
window.renderMessageItem = renderMessageItem;

console.log('✅ Все модули экспортированы!');