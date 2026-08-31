// ============================================================
// APP — Вспомогательная логика
// ============================================================

// ============================================================
// 1. SPEECH SYNTHESIS — Озвучка
// ============================================================

var speechSynthesisReady = false;
if ('speechSynthesis' in window) {
    speechSynthesisReady = true;
    window.speechSynthesis.getVoices();
}

function speakText(text, lang, rate, pitch) {
    lang = lang || 'ja-JP';
    rate = rate || 0.9;
    pitch = pitch || 1.0;
    
    if (!speechSynthesisReady) {
        showNotification('🔊', currentLang === 'ru' ? 'Озвучка не поддерживается' : 'Speech not supported', '');
        return;
    }
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;
    var voices = window.speechSynthesis.getVoices();
    var jpVoice = voices.find(function(voice) { return voice.lang === 'ja-JP'; });
    if (jpVoice) utterance.voice = jpVoice;
    window.speechSynthesis.speak(utterance);
}

function speakChar(char) {
    if (!char) return;
    speakText(char, 'ja-JP', 0.7, 1.0);
    showNotification('🔊', (currentLang === 'ru' ? 'Произносится' : 'Pronouncing') + ': ' + char, '');
}

function speakGrammarSentence() {
    var questionEl = document.getElementById('grammarQuestionText');
    if (!questionEl) return;
    var text = questionEl.textContent.replace(/___/g, ' ');
    var hintEl = document.getElementById('grammarHintText');
    if (hintEl && hintEl.textContent) text += ' ' + hintEl.textContent;
    speakText(text, 'ja-JP', 0.85, 1.0);
}

var autoSpeakGrammarEnabled = true;

function setupGrammarAutoSpeak() {
    var checkbox = document.getElementById('autoSpeakGrammar');
    if (!checkbox) return;
    var saved = localStorage.getItem('autoSpeakGrammar');
    if (saved !== null) {
        autoSpeakGrammarEnabled = saved === 'true';
        checkbox.checked = autoSpeakGrammarEnabled;
    }
    checkbox.addEventListener('change', function() {
        autoSpeakGrammarEnabled = this.checked;
        localStorage.setItem('autoSpeakGrammar', this.checked);
    });
}

// ============================================================
// 2. КВЕСТЫ
// ============================================================

function generateDailyQuests(xp) {
    var available = ALL_QUESTS.filter(function(q) { return q.minXP <= xp; });
    for (var i = available.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = available[i];
        available[i] = available[j];
        available[j] = temp;
    }
    return available.slice(0, 5).map(function(q) { return q.id; });
}

function checkDailyQuests() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    var today = new Date().toDateString();
    if (progress.questDate !== today) {
        var newQuestIds = generateDailyQuests(progress.xp || 0);
        progress.quests = {};
        progress.questIds = newQuestIds;
        progress.questDate = today;
        progress.bonusGiven = false;
        progress.questsNotified = {};
        progress.lastResetDate = today;
        newQuestIds.forEach(function(id) { progress.quests[id] = false; });
        saveProgress(currentUser, progress);
        showNotification('🔄', currentLang === 'ru' ? 'Новые задания на сегодня!' : 'New quests for today!', '');
    }
}

function completeQuest(questId, xpReward, title, subtitle) {
    if (!currentUser) return false;
    var progress = getProgress(currentUser);
    if (!progress.questIds || progress.questIds.indexOf(questId) === -1) return false;
    if (progress.quests[questId]) return false;
    progress.quests[questId] = true;
    progress.xp = (progress.xp || 0) + xpReward;
    saveProgress(currentUser, progress);
    if (!progress.questsNotified) progress.questsNotified = {};
    if (!progress.questsNotified[questId]) {
        progress.questsNotified[questId] = true;
        saveProgress(currentUser, progress);
        showNotification('🎯', title || (currentLang === 'ru' ? 'Задание выполнено!' : 'Quest completed!'), subtitle || '+'+xpReward+' XP');
    }
    if (typeof updateProfile === 'function') updateProfile();
    if (typeof updateQuestsUI === 'function') updateQuestsUI();
    if (typeof updateUI === 'function') updateUI();
    return true;
}

function checkAllQuestsOnLoad() {
    if (!currentUser) return;
    var progress = getProgress(currentUser);
    if (!progress.questIds) return;
    progress.questIds.forEach(function(id) {
        if (progress.quests[id]) return;
        var questData = ALL_QUESTS.find(function(q) { return q.id === id; });
        if (!questData) return;
        if (questData.check(progress)) {
            completeQuest(id, questData.xp, '✅ ' + getQuestName(id), '+'+questData.xp+' XP');
        }
    });
}

function resetDailyQuests() {
    if (!currentUser) {
        showNotification('🔐', currentLang === 'ru' ? 'Войди в аккаунт' : 'Log in', '');
        return;
    }
    var progress = getProgress(currentUser);
    var today = new Date().toDateString();
    if (progress.lastResetDate === today) {
        showNotification('⏳', currentLang === 'ru' ? 'Уже обновлено сегодня!' : 'Already refreshed today!', '');
        return;
    }
    var newQuestIds = generateDailyQuests(progress.xp || 0);
    progress.quests = {};
    progress.questIds = newQuestIds;
    progress.questDate = today;
    progress.bonusGiven = false;
    progress.questsNotified = {};
    progress.lastResetDate = today;
    newQuestIds.forEach(function(id) { progress.quests[id] = false; });
    saveProgress(currentUser, progress);
    if (typeof updateQuestsUI === 'function') updateQuestsUI();
    if (typeof updateProfile === 'function') updateProfile();
    showNotification('🔄', currentLang === 'ru' ? 'Задания обновлены!' : 'Quests refreshed!', '');
}

// ============================================================
// 3. ФИЛЬТРЫ ДЛЯ АЗБУКИ
// ============================================================

var filterState = { mode: 'hiragana', selectedRows: [], selectedChars: [], useCharSelection: false };
var kanjiFilterState = { selectedGroups: [], selectedChars: [], useCharSelection: false };

function getCurrentRowGroups() {
    var mode = filterState.mode;
    if (mode === 'hiragana') return ROW_GROUPS;
    if (mode === 'hiragana_full') return ROW_GROUPS_FULL;
    if (mode === 'katakana') return ROW_GROUPS_KATAKANA;
    if (mode === 'katakana_full') return ROW_GROUPS_KATAKANA_FULL;
    return ROW_GROUPS;
}

function getAllCharsForMode() {
    var mode = filterState.mode;
    if (mode === 'hiragana') return ALL_HIRAGANA;
    if (mode === 'hiragana_full') return ALL_FULL_HIRAGANA;
    if (mode === 'katakana') return ALL_KATAKANA;
    if (mode === 'katakana_full') return ALL_FULL_KATAKANA;
    return ALL_FULL_HIRAGANA;
}

function getFilteredPool() {
    var allChars = getAllCharsForMode();
    if (filterState.useCharSelection) {
        if (filterState.selectedChars.length === 0) return allChars;
        return allChars.filter(function(c) { return filterState.selectedChars.indexOf(c) !== -1; });
    } else {
        if (filterState.selectedRows.length === 0) return allChars;
        var rows = getCurrentRowGroups();
        var chars = [];
        filterState.selectedRows.forEach(function(rowKey) {
            if (rows[rowKey]) chars = chars.concat(rows[rowKey]);
        });
        return chars.filter(function(c) { return allChars.indexOf(c) !== -1; });
    }
}

function renderFilterPanel() {
    var rowsContainer = document.getElementById('filterRows');
    var charsContainer = document.getElementById('filterChars');
    if (!rowsContainer || !charsContainer) return;
    var rows = getCurrentRowGroups();
    var allChars = getAllCharsForMode();
    var rowKeys = Object.keys(rows);
    var rowsHtml = '';
    rowKeys.forEach(function(key) {
        var isActive = filterState.selectedRows.indexOf(key) !== -1;
        rowsHtml += '<button class="filter-row-btn ' + (isActive ? 'active' : '') + '" onclick="toggleRow(\'' + key + '\')">' + key + '</button>';
    });
    rowsContainer.innerHTML = rowsHtml;
    var charsHtml = '';
    var displayChars = allChars;
    if (filterState.selectedRows.length > 0 && !filterState.useCharSelection) {
        var rowChars = [];
        filterState.selectedRows.forEach(function(key) {
            if (rows[key]) rowChars = rowChars.concat(rows[key]);
        });
        displayChars = rowChars.filter(function(c) { return allChars.indexOf(c) !== -1; });
    }
    displayChars.forEach(function(char) {
        var isActive = filterState.selectedChars.indexOf(char) !== -1;
        var isInSelectedRows = filterState.selectedRows.some(function(key) { return rows[key] && rows[key].indexOf(char) !== -1; });
        var disabled = !filterState.useCharSelection && filterState.selectedRows.length > 0 && !isInSelectedRows;
        charsHtml += '<button class="filter-char-btn ' + (isActive ? 'active' : '') + (disabled ? ' disabled' : '') + '" onclick="toggleChar(\'' + char + '\')" ' + (disabled ? 'disabled' : '') + '>' + char + '</button>';
    });
    charsContainer.innerHTML = charsHtml || '<span style="color:#6c6e8a;font-size:11px;">Нет символов</span>';
    if (typeof updateTrainerPool === 'function') updateTrainerPool();
}

function toggleRow(key) {
    var idx = filterState.selectedRows.indexOf(key);
    if (idx >= 0) filterState.selectedRows.splice(idx, 1);
    else filterState.selectedRows.push(key);
    if (filterState.selectedRows.length > 0) {
        filterState.useCharSelection = false;
        filterState.selectedChars = [];
    }
    renderFilterPanel();
}

function toggleChar(char) {
    if (!filterState.useCharSelection) {
        filterState.useCharSelection = true;
        filterState.selectedChars = [];
    }
    var idx = filterState.selectedChars.indexOf(char);
    if (idx >= 0) filterState.selectedChars.splice(idx, 1);
    else filterState.selectedChars.push(char);
    renderFilterPanel();
}

function filterSelectAll() {
    var allChars = getAllCharsForMode();
    filterState.useCharSelection = true;
    filterState.selectedChars = allChars.slice();
    filterState.selectedRows = [];
    renderFilterPanel();
}

function filterSelectNone() {
    filterState.useCharSelection = false;
    filterState.selectedChars = [];
    filterState.selectedRows = [];
    renderFilterPanel();
}

function filterResetToDefault() {
    filterState.useCharSelection = false;
    filterState.selectedChars = [];
    filterState.selectedRows = [];
    renderFilterPanel();
}

function updateTrainerPool() {
    var filtered = getFilteredPool();
    currentPool = filtered.length === 0 ? getAllCharsForMode() : filtered;
    if (typeof loadNewQuestion === 'function') loadNewQuestion();
}

// ============================================================
// 4. ФИЛЬТРЫ ДЛЯ КАНДЗИ
// ============================================================

function getKanjiGroupName(key) {
    return currentLang === 'ru' ? KANJI_GROUP_NAMES[key] || key : KANJI_GROUP_NAMES_EN[key] || key;
}

function getAllKanjiChars() { return KANJI_DATA.map(function(item) { return item.kanji; }); }

function getKanjiFilteredPool() {
    var allChars = getAllKanjiChars();
    if (kanjiFilterState.useCharSelection) {
        if (kanjiFilterState.selectedChars.length === 0) return allChars;
        return allChars.filter(function(c) { return kanjiFilterState.selectedChars.indexOf(c) !== -1; });
    } else {
        if (kanjiFilterState.selectedGroups.length === 0) return allChars;
        var chars = [];
        kanjiFilterState.selectedGroups.forEach(function(groupKey) {
            if (KANJI_FILTER_GROUPS[groupKey]) {
                chars = chars.concat(KANJI_FILTER_GROUPS[groupKey]);
            }
        });
        return chars.filter(function(c) { return allChars.indexOf(c) !== -1; });
    }
}

function renderKanjiFilterPanel() {
    var rowsContainer = document.getElementById('kanjiFilterRows');
    var charsContainer = document.getElementById('kanjiFilterChars');
    if (!rowsContainer || !charsContainer) return;
    var groupKeys = Object.keys(KANJI_FILTER_GROUPS);
    var allChars = getAllKanjiChars();
    var rowsHtml = '';
    groupKeys.forEach(function(key) {
        var isActive = kanjiFilterState.selectedGroups.indexOf(key) !== -1;
        var name = getKanjiGroupName(key);
        rowsHtml += '<button class="filter-row-btn ' + (isActive ? 'active' : '') + '" onclick="toggleKanjiGroup(\'' + key + '\')">' + name + '</button>';
    });
    rowsContainer.innerHTML = rowsHtml;
    var charsHtml = '';
    var displayChars = allChars;
    if (kanjiFilterState.selectedGroups.length > 0 && !kanjiFilterState.useCharSelection) {
        var groupChars = [];
        kanjiFilterState.selectedGroups.forEach(function(key) {
            if (KANJI_FILTER_GROUPS[key]) groupChars = groupChars.concat(KANJI_FILTER_GROUPS[key]);
        });
        displayChars = groupChars.filter(function(c) { return allChars.indexOf(c) !== -1; });
    }
    displayChars.forEach(function(char) {
        var isActive = kanjiFilterState.selectedChars.indexOf(char) !== -1;
        var isInSelectedGroups = kanjiFilterState.selectedGroups.some(function(key) {
            return KANJI_FILTER_GROUPS[key] && KANJI_FILTER_GROUPS[key].indexOf(char) !== -1;
        });
        var disabled = !kanjiFilterState.useCharSelection && kanjiFilterState.selectedGroups.length > 0 && !isInSelectedGroups;
        charsHtml += '<button class="filter-char-btn ' + (isActive ? 'active' : '') + (disabled ? ' disabled' : '') + '" onclick="toggleKanjiChar(\'' + char + '\')" ' + (disabled ? 'disabled' : '') + '>' + char + '</button>';
    });
    charsContainer.innerHTML = charsHtml || '<span style="color:#6c6e8a;font-size:11px;">' + (currentLang === 'ru' ? 'Нет кандзи' : 'No kanji') + '</span>';
    if (typeof updateKanjiTrainerPool === 'function') updateKanjiTrainerPool();
}

function toggleKanjiGroup(key) {
    var idx = kanjiFilterState.selectedGroups.indexOf(key);
    if (idx >= 0) kanjiFilterState.selectedGroups.splice(idx, 1);
    else kanjiFilterState.selectedGroups.push(key);
    if (kanjiFilterState.selectedGroups.length > 0) {
        kanjiFilterState.useCharSelection = false;
        kanjiFilterState.selectedChars = [];
    }
    renderKanjiFilterPanel();
}

function toggleKanjiChar(char) {
    if (!kanjiFilterState.useCharSelection) {
        kanjiFilterState.useCharSelection = true;
        kanjiFilterState.selectedChars = [];
    }
    var idx = kanjiFilterState.selectedChars.indexOf(char);
    if (idx >= 0) kanjiFilterState.selectedChars.splice(idx, 1);
    else kanjiFilterState.selectedChars.push(char);
    renderKanjiFilterPanel();
}

function kanjiFilterSelectAll() {
    var allChars = getAllKanjiChars();
    kanjiFilterState.useCharSelection = true;
    kanjiFilterState.selectedChars = allChars.slice();
    kanjiFilterState.selectedGroups = [];
    renderKanjiFilterPanel();
}

function kanjiFilterSelectNone() {
    kanjiFilterState.useCharSelection = false;
    kanjiFilterState.selectedChars = [];
    kanjiFilterState.selectedGroups = [];
    renderKanjiFilterPanel();
}

function kanjiFilterResetToDefault() {
    kanjiFilterState.useCharSelection = false;
    kanjiFilterState.selectedChars = [];
    kanjiFilterState.selectedGroups = [];
    renderKanjiFilterPanel();
}

function updateKanjiTrainerPool() {
    var filtered = getKanjiFilteredPool();
    kanjiTrainQueue = filtered.length === 0 ? getAllKanjiChars() : filtered;
    for (var i = kanjiTrainQueue.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = kanjiTrainQueue[i];
        kanjiTrainQueue[i] = kanjiTrainQueue[j];
        kanjiTrainQueue[j] = temp;
    }
    kanjiTrainIndex = 0;
    if (typeof loadKanjiQuestion === 'function') loadKanjiQuestion();
}

// ============================================================
// 5. ТАБЛИЦЫ АЗБУКИ
// ============================================================

function renderAlphabetTable(type) {
    var container = document.getElementById('alphabetTable');
    var trainerEl = document.getElementById('alphabetTrainer');
    var filterPanel = document.getElementById('filterPanel');
    if (!container) return;
    
    if (type === 'train') {
        container.style.display = 'none';
        if (trainerEl) trainerEl.style.display = 'block';
        if (filterPanel) filterPanel.style.display = 'block';
        if (typeof initTrainer === 'function') { if (!trainerInitialized) initTrainer(); else { syncTrainerFromProfile(); loadNewQuestion(); renderFilterPanel(); } }
        document.querySelectorAll('.btn-azbuka-table').forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.dataset.table === type) {
                btn.classList.add('active');
                btn.style.background = '#e94560';
                btn.style.color = 'white';
            } else {
                btn.style.background = '#2a2a4a';
                btn.style.color = '#a7a9be';
            }
        });
        return;
    } else {
        container.style.display = 'block';
        if (trainerEl) trainerEl.style.display = 'none';
        if (filterPanel) filterPanel.style.display = 'none';
    }

    var rows, title;
    if (type === 'hiragana') { rows = HIRAGANA_ROWS; title = currentLang === 'ru' ? 'Хирагана (основная)' : 'Hiragana (basic)'; filterState.mode = 'hiragana'; filterState.selectedRows = []; filterState.selectedChars = []; filterState.useCharSelection = false; }
    else if (type === 'hiragana_full') { rows = ROW_GROUPS_FULL; title = currentLang === 'ru' ? 'Хирагана (полная)' : 'Hiragana (full)'; filterState.mode = 'hiragana_full'; filterState.selectedRows = []; filterState.selectedChars = []; filterState.useCharSelection = false; }
    else if (type === 'katakana') { rows = KATAKANA_ROWS; title = currentLang === 'ru' ? 'Катакана (основная)' : 'Katakana (basic)'; filterState.mode = 'katakana'; filterState.selectedRows = []; filterState.selectedChars = []; filterState.useCharSelection = false; }
    else if (type === 'katakana_full') { rows = ROW_GROUPS_KATAKANA_FULL; title = currentLang === 'ru' ? 'Катакана (полная)' : 'Katakana (full)'; filterState.mode = 'katakana_full'; filterState.selectedRows = []; filterState.selectedChars = []; filterState.useCharSelection = false; }
    else { rows = HIRAGANA_ROWS; title = 'Hiragana'; filterState.mode = 'hiragana'; }
    
    var maxCols = 5;
    var html = '<div style="background:#1a1a2e;border-radius:16px;padding:12px;border:1px solid #2a2a4a;overflow-x:auto;"><div style="display:grid;grid-template-columns:36px repeat('+maxCols+',1fr);gap:2px;font-size:11px;min-width:280px;"><div style="color:#6c6e8a;padding:4px;text-align:center;font-weight:700;border-bottom:2px solid #2a2a4a;">' + (currentLang === 'ru' ? 'Ряд' : 'Row') + '</div>';
    var colLabels = ['', 'あ/a', 'い/i', 'う/u', 'え/e', 'お/o'];
    for (var i = 1; i <= maxCols; i++) { html += '<div style="color:#6c6e8a;padding:4px;text-align:center;font-weight:700;border-bottom:2px solid #2a2a4a;">' + (colLabels[i] || '') + '</div>'; }
    var rowKeys = Object.keys(rows);
    rowKeys.forEach(function(rowKey) {
        var chars = rows[rowKey];
        var rowName = ROMAJI[rowKey] || rowKey;
        html += '<div style="color:#e94560;padding:5px 2px;text-align:center;font-weight:700;border-bottom:1px solid #2a2a4a;font-size:12px;">' + rowKey + '<br><span style="font-size:8px;color:#6c6e8a;font-weight:400;">' + rowName + '</span></div>';
        for (var j = 0; j < maxCols; j++) {
            var char = chars[j] || '';
            var romaji = ROMAJI[char] || '';
            if (char) {
                html += '<div onclick="speakChar(\'' + char + '\')" style="background:#0f0e17;border-radius:6px;padding:5px 2px;text-align:center;border:1px solid #2a2a4a;transition:0.3s;cursor:pointer;" onmouseenter="this.style.borderColor=\'#e94560\';this.style.transform=\'scale(1.03)\'" onmouseleave="this.style.borderColor=\'#2a2a4a\';this.style.transform=\'scale(1)\'"><div style="font-size:20px;font-weight:700;color:#fffffe;">' + char + '</div><div style="font-size:8px;color:#6c6e8a;margin-top:1px;">' + romaji + '</div></div>';
            } else {
                html += '<div style="padding:5px 2px;text-align:center;opacity:0.15;border-bottom:1px solid #2a2a4a;">·</div>';
            }
        }
    });
    html += '</div></div><p style="text-align:center;color:#6c6e8a;font-size:11px;margin-top:8px;">📖 ' + title + ' — ' + Object.values(rows).flat().filter(function(c) { return c; }).length + ' ' + (currentLang === 'ru' ? 'символов (нажми для озвучки)' : 'characters (click to hear)') + '</p>';
    container.innerHTML = html;
    document.querySelectorAll('.btn-azbuka-table').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.table === type) { btn.classList.add('active'); btn.style.background = '#e94560'; btn.style.color = 'white'; }
        else { btn.style.background = '#2a2a4a'; btn.style.color = '#a7a9be'; }
    });
}

function switchTable(type) { renderAlphabetTable(type); }

// ============================================================
// 6. КАНДЗИ, ГРАММАТИКА, СЛОВА — ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
// ============================================================

var currentKanjiGroup = 'all';

function filterKanjiByGroup(group) {
    currentKanjiGroup = group;
    document.querySelectorAll('.kanji-group-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.group === group);
    });
    if (typeof renderKanjiList === 'function') renderKanjiList();
}

function getKanjiMeaning(item) { return currentLang === 'ru' ? item.meaning_ru : item.meaning_en; }
function getGrammarMeaning(item) { return currentLang === 'ru' ? item.meaning_ru : item.meaning_en; }
function getVocabMeaning(item) { return currentLang === 'ru' ? item.meaning_ru : item.meaning_en; }

function switchKanjiTab(tab) {
    document.querySelectorAll('.kanji-tab-content').forEach(function(el) { el.style.display = 'none'; });
    document.getElementById('kanjiList').style.display = (tab === 'list') ? 'block' : 'none';
    document.getElementById('kanjiTrain').style.display = (tab === 'train') ? 'block' : 'none';
    document.getElementById('kanjiProgress').style.display = (tab === 'progress') ? 'block' : 'none';
    document.querySelectorAll('.btn-kanji-tab').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) { btn.classList.add('active'); btn.style.background = '#e94560'; btn.style.color = 'white'; }
        else { btn.style.background = '#2a2a4a'; btn.style.color = '#a7a9be'; }
    });
    if (tab === 'list' && typeof renderKanjiList === 'function') renderKanjiList();
    if (tab === 'train') { if (typeof renderKanjiFilterPanel === 'function') renderKanjiFilterPanel(); if (typeof loadKanjiProgress === 'function') loadKanjiProgress(); }
    if (tab === 'progress' && typeof updateKanjiStats === 'function') updateKanjiStats();
}

function switchGrammarTab(tab) {
    document.querySelectorAll('.grammar-tab-content').forEach(function(el) { el.style.display = 'none'; });
    document.getElementById('grammarList').style.display = (tab === 'list') ? 'block' : 'none';
    document.getElementById('grammarTrain').style.display = (tab === 'train') ? 'block' : 'none';
    document.getElementById('grammarProgress').style.display = (tab === 'progress') ? 'block' : 'none';
    document.querySelectorAll('.btn-grammar-tab').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) { btn.classList.add('active'); btn.style.background = '#e94560'; btn.style.color = 'white'; }
        else { btn.style.background = '#2a2a4a'; btn.style.color = '#a7a9be'; }
    });
    if (tab === 'list' && typeof renderGrammarList === 'function') renderGrammarList();
    if (tab === 'train') { if (typeof loadGrammarProgress === 'function') loadGrammarProgress(); }
    if (tab === 'progress' && typeof updateGrammarStats === 'function') updateGrammarStats();
}

function switchVocabTab(tab) {
    document.querySelectorAll('.vocab-tab-content').forEach(function(el) { el.style.display = 'none'; });
    document.getElementById('vocabList').style.display = (tab === 'list') ? 'block' : 'none';
    document.getElementById('vocabTrain').style.display = (tab === 'train') ? 'block' : 'none';
    document.getElementById('vocabProgress').style.display = (tab === 'progress') ? 'block' : 'none';
    document.querySelectorAll('.btn-vocab-tab').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) { btn.classList.add('active'); btn.style.background = '#e94560'; btn.style.color = 'white'; }
        else { btn.style.background = '#2a2a4a'; btn.style.color = '#a7a9be'; }
    });
    if (tab === 'list' && typeof renderVocabList === 'function') renderVocabList();
    if (tab === 'train') { if (typeof loadVocabProgress === 'function') loadVocabProgress(); }
    if (tab === 'progress' && typeof updateVocabStats === 'function') updateVocabStats();
}

// ============================================================
// ЭКСПОРТ
// ============================================================

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

console.log('✅ app.js загружен!');