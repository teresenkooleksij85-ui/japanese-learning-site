// База данных Хираганы
const kanaData = {
    "あ": { reading: "a / а", example: "あさ", exampleReading: "asa / аса", meaning: "утро" },
    "い": { reading: "i / и", example: "いぬ", exampleReading: "inu / ину", meaning: "собака" },
    "う": { reading: "u / у", example: "うみ", exampleReading: "umi / уми", meaning: "море" },
    "え": { reading: "e / э", example: "えき", exampleReading: "eki / эки", meaning: "станция" },
    "お": { reading: "o / о", example: "おちゃ", exampleReading: "ocha / оча", meaning: "чай" },
    "か": { reading: "ka / ка", example: "かさ", exampleReading: "kasa / каса", meaning: "зонт" },
    "き": { reading: "ki / ки", example: "き", exampleReading: "ki / ки", meaning: "дерево" },
    "く": { reading: "ku / ку", example: "くち", exampleReading: "kuchi / кучи", meaning: "рот" },
    "け": { reading: "ke / кэ", example: "け", exampleReading: "ke / кэ", meaning: "волосы" },
    "こ": { reading: "ko / ко", example: "こえ", exampleReading: "koe / коэ", meaning: "голос" },
    "さ": { reading: "sa / са", example: "さかな", exampleReading: "sakana / сакана", meaning: "рыба" },
    "し": { reading: "shi / си", example: "しお", exampleReading: "shio / сио", meaning: "соль" },
    "す": { reading: "su / су", example: "すし", exampleReading: "sushi / суси", meaning: "суши" },
    "せ": { reading: "se / сэ", example: "せんせい", exampleReading: "sensei / сэнсэй", meaning: "учитель" },
    "そ": { reading: "so / со", example: "そら", exampleReading: "sora / сора", meaning: "небо" },
    "た": { reading: "ta / та", example: "たまご", exampleReading: "tamago / тамаго", meaning: "яйцо" },
    "ち": { reading: "chi / ти", example: "ちず", exampleReading: "chizu / тидзу", meaning: "карта" },
    "つ": { reading: "tsu / цу", example: "つき", exampleReading: "tsuki / цуки", meaning: "луна" },
    "て": { reading: "te / тэ", example: "て", exampleReading: "te / тэ", meaning: "рука" },
    "と": { reading: "to / то", example: "とり", exampleReading: "tori / тори", meaning: "птица" },
    "な": { reading: "na / на", example: "なつ", exampleReading: "natsu / нацу", meaning: "лето" },
    "に": { reading: "ni / ни", example: "にく", exampleReading: "niku / нику", meaning: "мясо" },
    "ぬ": { reading: "nu / ну", example: "ぬの", exampleReading: "nuno / нуно", meaning: "ткань" },
    "ね": { reading: "ne / нэ", example: "ねこ", exampleReading: "neko / нэко", meaning: "кошка" },
    "の": { reading: "no / но", example: "のみもの", exampleReading: "nomimono / номимоно", meaning: "напиток" },
    "は": { reading: "ha / ха", example: "はな", exampleReading: "hana / хана", meaning: "цветок" },
    "ひ": { reading: "hi / хи", example: "ひる", exampleReading: "hiru / хиру", meaning: "день" },
    "ふ": { reading: "fu / фу", example: "ふね", exampleReading: "fune / фунэ", meaning: "корабль" },
    "へ": { reading: "he / хэ", example: "へや", exampleReading: "heya / хэя", meaning: "комната" },
    "ほ": { reading: "ho / хо", example: "ほし", exampleReading: "hoshi / хоси", meaning: "звезда" },
    "ま": { reading: "ma / ма", example: "まど", exampleReading: "mado / мадо", meaning: "окно" },
    "み": { reading: "mi / ми", example: "みず", exampleReading: "mizu / мидзу", meaning: "вода" },
    "む": { reading: "mu / му", example: "むし", exampleReading: "mushi / муси", meaning: "насекомое" },
    "め": { reading: "me / мэ", example: "め", exampleReading: "me / мэ", meaning: "глаз" },
    "も": { reading: "mo / мо", example: "もり", exampleReading: "mori / мори", meaning: "лес" },
    "や": { reading: "ya / я", example: "やま", exampleReading: "yama / яма", meaning: "гора" },
    "ゆ": { reading: "yu / ю", example: "ゆき", exampleReading: "yuki / юки", meaning: "снег" },
    "よ": { reading: "yo / ё", example: "よる", exampleReading: "yoru / ёру", meaning: "ночь" },
    "ら": { reading: "ra / ра", example: "らく", exampleReading: "raku / раку", meaning: "лёгкий" },
    "り": { reading: "ri / ри", example: "りんご", exampleReading: "ringo / ринго", meaning: "яблоко" },
    "る": { reading: "ru / ру", example: "るす", exampleReading: "rusu / русу", meaning: "отсутствие дома" },
    "れ": { reading: "re / рэ", example: "れきし", exampleReading: "rekishi / рэкиси", meaning: "история" },
    "ろ": { reading: "ro / ро", example: "ろうか", exampleReading: "rouka / рока", meaning: "коридор" },
    "わ": { reading: "wa / ва", example: "わたし", exampleReading: "watashi / ватаси", meaning: "я" },
    "を": { reading: "o / о", example: "みずを", exampleReading: "mizu o / мидзу о", meaning: "частица" },
    "ん": { reading: "n / н", example: "ほん", exampleReading: "hon / хон", meaning: "книга" },

    // Дакуон / Хандакуон
    "が": { reading: "ga / га", example: "がいこく", exampleReading: "gaikoku / гайкоку", meaning: "заграница" },
    "ぎ": { reading: "gi / ги", example: "ぎんこう", exampleReading: "ginkou / гинко", meaning: "банк" },
    "ぐ": { reading: "gu / гу", example: "ぐんじん", exampleReading: "gunjin / гундзин", meaning: "военный" },
    "げ": { reading: "ge / гэ", example: "げんき", exampleReading: "genki / гэнки", meaning: "бодрость" },
    "ご": { reading: "go / го", example: "ごはん", exampleReading: "gohan / гохан", meaning: "рис" },
    "ざ": { reading: "za / дза", example: "ざっし", exampleReading: "zasshi / дзасси", meaning: "журнал" },
    "じ": { reading: "ji / дзи", example: "じかん", exampleReading: "jikan / дзикан", meaning: "время" },
    "ず": { reading: "zu / дзу", example: "みず", exampleReading: "mizu / мидзу", meaning: "вода" },
    "ぜ": { reading: "ze / дзэ", example: "ぜんぶ", exampleReading: "zenbu / дзэмбу", meaning: "всё" },
    "ぞ": { reading: "zo / дзо", example: "ぞう", exampleReading: "zou / дзо", meaning: "слон" },
    "だ": { reading: "da / да", example: "だいがく", exampleReading: "daigaku / дайгаку", meaning: "университет" },
    "ぢ": { reading: "ji / дзи", example: "ぢ", exampleReading: "ji / дзи", meaning: "редкий знак" },
    "づ": { reading: "zu / дзу", example: "つづく", exampleReading: "tsuduku / цудуку", meaning: "продолжаться" },
    "で": { reading: "de / дэ", example: "でんわ", exampleReading: "denwa / дэнва", meaning: "телефон" },
    "ど": { reading: "do / до", example: "ドア", exampleReading: "doa / доа", meaning: "дверь" },
    "ば": { reading: "ba / ба", example: "ばんごう", exampleReading: "bangou / банго", meaning: "номер" },
    "び": { reading: "bi / би", example: "びょういん", exampleReading: "byouin / бёин", meaning: "больница" },
    "ぶ": { reading: "bu / бу", example: "ぶた", exampleReading: "buta / бута", meaning: "свинья" },
    "べ": { reading: "be / бэ", example: "べんきょう", exampleReading: "benkyou / бэнкё", meaning: "учеба" },
    "ぼ": { reading: "bo / бо", example: "ぼうし", exampleReading: "boushi / боси", meaning: "шляпа" },
    "ぱ": { reading: "pa / па", example: "パン", exampleReading: "pan / пан", meaning: "хлеб" },
    "ぴ": { reading: "pi / пи", example: "ピアニスト", exampleReading: "pianisuto / пианисуто", meaning: "пианист" },
    "ぷ": { reading: "pu / пу", example: "プール", exampleReading: "puuru / пуру", meaning: "бассейн" },
    "ぺ": { reading: "pe / пэ", example: "ペット", exampleReading: "petto / пэтто", meaning: "питомец" },
    "ぽ": { reading: "po / по", example: "ポケット", exampleReading: "poketto / покэтто", meaning: "карман" }
};

// База данных Катаканы
const katakanaData = {
    "ア": { reading: "a / а", example: "アニメ", exampleReading: "anime / анимэ", meaning: "аниме" },
    "イ": { reading: "i / и", example: "イギリス", exampleReading: "igirisu / игирису", meaning: "Великобритания" },
    "ウ": { reading: "u / у", example: "ウイルス", exampleReading: "uirusu / уирусу", meaning: "вирус" },
    "エ": { reading: "e / э", example: "エレベーター", exampleReading: "erebeetaa / эребэтаа", meaning: "лифт" },
    "オ": { reading: "o / о", example: "オレンジ", exampleReading: "orenji / орэнджи", meaning: "апельсин" },
    "カ": { reading: "ka / ка", example: "カメラ", exampleReading: "kamera / камера", meaning: "камера" },
    "キ": { reading: "ki / ки", example: "キロ", exampleReading: "kiro / кило", meaning: "килограмм" },
    "ク": { reading: "ku / ку", example: "クラス", exampleReading: "kurasu / курасу", meaning: "класс" },
    "ケ": { reading: "ke / кэ", example: "ケーキ", exampleReading: "keeki / кээки", meaning: "торт" },
    "コ": { reading: "ko / ко", example: "コーヒー", exampleReading: "koohii / ко:хи", meaning: "кофе" },
    "サ": { reading: "sa / са", example: "サラダ", exampleReading: "sarada / сарада", meaning: "салат" },
    "シ": { reading: "shi / си", example: "シャツ", exampleReading: "shatsu / сяцу", meaning: "рубашка" },
    "ス": { reading: "su / су", example: "スポーツ", exampleReading: "supootsu / супо:цу", meaning: "спорт" },
    "セ": { reading: "se / сэ", example: "セーター", exampleReading: "seetaa / сээтаа", meaning: "свитер" },
    "ソ": { reading: "so / со", example: "ソファ", exampleReading: "sofa / софа", meaning: "диван" },
    "タ": { reading: "ta / та", example: "タクシー", exampleReading: "takushii / такуси:", meaning: "такси" },
    "チ": { reading: "chi / ти", example: "チーズ", exampleReading: "chiizu / ти:дзу", meaning: "сыр" },
    "ツ": { reading: "tsu / цу", example: "ツアー", exampleReading: "tsuaa / цуа:", meaning: "тур" },
    "テ": { reading: "te / тэ", example: "テレビ", exampleReading: "terebi / тэрэби", meaning: "телевизор" },
    "ト": { reading: "to / то", example: "トマト", exampleReading: "tomato / томато", meaning: "помидор" },
    "ナ": { reading: "na / на", example: "ナイフ", exampleReading: "naifu / найфу", meaning: "нож" },
    "ニ": { reading: "ni / ни", example: "ニュース", exampleReading: "nyuusu / нью:су", meaning: "новости" },
    "ヌ": { reading: "nu / ну", example: "ヌードル", exampleReading: "nuudoru / ну:дору", meaning: "лапша" },
    "ネ": { reading: "ne / нэ", example: "ネクタイ", exampleReading: "nekutai / нэкутаи", meaning: "галстук" },
    "ノ": { reading: "no / но", example: "ノート", exampleReading: "nooto / но:то", meaning: "тетрадь" },
    "ハ": { reading: "ha / ха", example: "ハンバーガー", exampleReading: "hanbaagaa / хамба:га:", meaning: "гамбургер" },
    "ヒ": { reading: "hi / хи", example: "ヒーロー", exampleReading: "hiiroo / хи:ро:", meaning: "герой" },
    "フ": { reading: "fu / фу", example: "フランス", exampleReading: "furansu / фурансу", meaning: "Франция" },
    "ヘ": { reading: "he / хэ", example: "ヘリコプター", exampleReading: "herikoputaa / хэрикопута:", meaning: "вертолёт" },
    "ホ": { reading: "ho / хо", example: "ホテル", exampleReading: "hoteru / хотэру", meaning: "отель" },
    "マ": { reading: "ma / ма", example: "マスク", exampleReading: "masuku / масуку", meaning: "маска" },
    "ミ": { reading: "mi / ми", example: "ミルク", exampleReading: "miruku / мируку", meaning: "молоко" },
    "ム": { reading: "mu / му", example: "ムービー", exampleReading: "muubii / му:би:", meaning: "фильм" },
    "メ": { reading: "me / мэ", example: "メール", exampleReading: "meeru / мэ:ру", meaning: "электронная почта" },
    "モ": { reading: "mo / мо", example: "モデル", exampleReading: "moderu / модэру", meaning: "модель" },
    "ヤ": { reading: "ya / я", example: "ヤクルト", exampleReading: "yakuruto / якурюто", meaning: "Якульт" },
    "ユ": { reading: "yu / ю", example: "ユニフォーム", exampleReading: "yunifoomu / юнифо:му", meaning: "форма" },
    "ヨ": { reading: "yo / ё", example: "ヨーロッパ", exampleReading: "yooroppa / ё:роппа", meaning: "Европа" },
    "ラ": { reading: "ra / ра", example: "ラーメン", exampleReading: "raamen / ра:мэн", meaning: "рамен" },
    "リ": { reading: "ri / ри", example: "リンゴ", exampleReading: "ringo / ринго", meaning: "яблоко" },
    "ル": { reading: "ru / ру", example: "ルール", exampleReading: "ruuru / ру:ру", meaning: "правило" },
    "レ": { reading: "re / рэ", example: "レストラン", exampleReading: "resutoran / рэсуторан", meaning: "ресторан" },
    "ロ": { reading: "ro / ро", example: "ロボット", exampleReading: "robotto / роботто", meaning: "робот" },
    "ワ": { reading: "wa / ва", example: "ワイン", exampleReading: "wain / ваин", meaning: "вино" },
    "ヲ": { reading: "wo / о", example: "ヲ", exampleReading: "wo / о", meaning: "частица" },
    "ン": { reading: "n / н", example: "パン", exampleReading: "pan / пан", meaning: "хлеб" },

    // Дакуон
    "ガ": { reading: "ga / га", example: "ガス", exampleReading: "gasu / гасу", meaning: "газ" },
    "ギ": { reading: "gi / ги", example: "ギター", exampleReading: "gitaa / гита", meaning: "гитара" },
    "グ": { reading: "gu / гу", example: "グループ", exampleReading: "guruupu / гурупу", meaning: "группа" },
    "ゲ": { reading: "ge / гэ", example: "ゲーム", exampleReading: "geemu / гэйму", meaning: "игра" },
    "ゴ": { reading: "go / го", example: "ゴルフ", exampleReading: "gorufu / горуфу", meaning: "гольф" },
    "バ": { reading: "ba / ба", example: "バス", exampleReading: "basu / басу", meaning: "автобус" },
    "ビ": { reading: "bi / би", example: "ビル", exampleReading: "biru / биру", meaning: "здание" },
    "ブ": { reading: "bu / бу", example: "ブログ", exampleReading: "burogu / бурогу", meaning: "блог" },
    "ベ": { reading: "be / бэ", example: "ベッド", exampleReading: "beddo / бэддо", meaning: "кровать" },
    "ボ": { reading: "bo / бо", example: "ボタン", exampleReading: "botan / ботан", meaning: "кнопка" },
    "パ": { reading: "pa / па", example: "パスポート", exampleReading: "pasupooto / пасупото", meaning: "паспорт" },
    "ピ": { reading: "pi / пи", example: "ピンク", exampleReading: "pinku / пинку", meaning: "розовый" },
    "プ": { reading: "pu / пу", example: "プレゼント", exampleReading: "purezento / пурэдзэнто", meaning: "подарок" },
    "ペ": { reading: "pe / пэ", example: "ペン", exampleReading: "pen / пэн", meaning: "ручка" },
    "ポ": { reading: "po / по", example: "ポスト", exampleReading: "posuto / посуто", meaning: "почтовый ящик" }
};

// Озвучка
function speakKana(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

// Глобальные переменные теста
let activeQuestions = [];
let currentQuestion = 0;
let correctCount = parseInt(localStorage.getItem("correctCount")) || 0;
let wrongCount = parseInt(localStorage.getItem("wrongCount")) || 0;
let currentMode = "write";
let totalQuestionsLimit = Infinity;
let questionsAnswered = 0;

// Инициализация событий при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    // 1. Клики для таблиц хираганы и катаканы
    const kanaElements = document.querySelectorAll(".kana:not(.empty)");
    kanaElements.forEach(element => {
        element.addEventListener("click", function () {
            const char = this.textContent.trim();
            const data = kanaData[char] || katakanaData[char];

            if (data) {
                const charElem = document.getElementById("kana-character");
                const textElem = document.getElementById("kana-text");
                const exampleElem = document.getElementById("kana-example");
                const exampleReadingElem = document.getElementById("kana-example-reading");
                const meaningElem = document.getElementById("kana-meaning");

                if (charElem) charElem.textContent = char;
                if (textElem) textElem.textContent = "Чтение: " + data.reading;
                if (exampleElem) exampleElem.textContent = "Пример: " + data.example;
                if (exampleReadingElem) exampleReadingElem.textContent = "Чтение примера: " + data.exampleReading;
                if (meaningElem) meaningElem.textContent = "Перевод: " + data.meaning;

                speakKana(char);
            }
        });
    });

    // 2. Нажатие Enter в тестировании
    const testAnswer = document.getElementById("test-answer");
    if (testAnswer) {
        testAnswer.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                checkAnswer();
            }
        });
    }

    // 3. Запуск тестов при открытии practice.html
    if (document.getElementById("kana-test")) {
        updateStatsUI();
        applySelectedRows();
    }
});

function updateStatsUI() {
    const cCount = document.getElementById("correct-count");
    const wCount = document.getElementById("wrong-count");
    if (cCount) cCount.textContent = correctCount;
    if (wCount) wCount.textContent = wrongCount;
}

function toggleRows(script) {
    let element = document.getElementById(script + "-rows");
    if (element) {
        element.classList.toggle("hidden");
    }
}

function toggleRowGroup(masterCheckbox, groupClass) {
    let checkboxes = document.querySelectorAll("." + groupClass);
    checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
    applySelectedRows();
}

function selectAll(script, state) {
    let checkboxes = document.querySelectorAll("#" + script + "-rows input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = state);
    applySelectedRows();
}

function applySelectedRows() {
    let checkedBoxes = document.querySelectorAll(".kana-checkbox:checked");
    let selectedKana = Array.from(checkedBoxes).map(cb => cb.dataset.kana);

    activeQuestions = [];
    selectedKana.forEach(kana => {
        if (kanaData[kana]) activeQuestions.push({ kana: kana, answers: [kanaData[kana].reading] });
        if (katakanaData[kana]) activeQuestions.push({ kana: kana, answers: [katakanaData[kana].reading] });
    });

    let warningElem = document.getElementById("select-warning");

    if (activeQuestions.length === 0) {
        const tKana = document.getElementById("test-kana");
        if (tKana) tKana.textContent = "-";
        if (warningElem) warningElem.style.display = "block";
        const tRes = document.getElementById("test-result");
        if (tRes) tRes.textContent = "";
        const tAns = document.getElementById("test-answer");
        if (tAns) tAns.style.display = "inline-block";
        removeChoiceButtons();
        return;
    } else {
        if (warningElem) warningElem.style.display = "none";
    }

    questionsAnswered = 0;
    activeQuestions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    if (!activeQuestions[currentQuestion]) return;

    const tKana = document.getElementById("test-kana");
    const tAns = document.getElementById("test-answer");
    const modeSelect = document.getElementById("test-mode");
    const limitSelect = document.getElementById("test-limit");
    const typeSelect = document.getElementById("test-type");
    
    currentMode = modeSelect ? modeSelect.value : "write";
    totalQuestionsLimit = (limitSelect && limitSelect.value !== "inf") ? parseInt(limitSelect.value) : Infinity;

    if (questionsAnswered >= totalQuestionsLimit) {
        if (tKana) tKana.textContent = "🎉";
        document.getElementById("test-result").textContent = `Сессия окончена! Пройдено вопросов: ${questionsAnswered}`;
        if (tAns) tAns.style.display = "none";
        removeChoiceButtons();
        return;
    }

    const currentItem = activeQuestions[currentQuestion];
    const isWordsMode = typeSelect && typeSelect.value === "words";

    if (currentMode === "write") {
        // Если это слова — показываем ТОЛЬКО иероглиф/слово без скобок
        if (tKana) tKana.textContent = isWordsMode ? currentItem.jp : currentItem.kana;
        if (tAns) {
            tAns.style.display = "inline-block";
            tAns.placeholder = isWordsMode ? "перевод (чай, я, вода...)" : "чтение (a, ka, i...)";
            tAns.value = "";
            tAns.focus();
        }
        removeChoiceButtons();
    } else if (currentMode === "choice") {
        if (tKana) {
            if (isWordsMode) {
                tKana.textContent = currentItem.answers[0]; // Показываем перевод
            } else {
                let rawReading = currentItem.answers[0].split('/')[0].trim();
                tKana.textContent = rawReading;
            }
        }
        if (tAns) tAns.style.display = "none";
        renderChoiceButtons(currentItem.kana);
    }
}
function renderChoiceButtons(correctKana) {
    removeChoiceButtons();
    const container = document.getElementById("kana-test");
    const btnBox = document.createElement("div");
    btnBox.id = "choice-container"; // Стили сетки 2х2 берутся из style.css!

    let choices = [correctKana];
    let allKeys = Object.keys({...kanaData, ...katakanaData});
    
    while (choices.length < 4) {
        let randKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        if (!choices.includes(randKey)) choices.push(randKey);
    }
    choices.sort(() => Math.random() - 0.5);

    choices.forEach(char => {
        let btn = document.createElement("button");
        btn.textContent = char;
        btn.className = "action-btn";
        btn.onclick = () => checkChoiceAnswer(char, correctKana);
        btnBox.appendChild(btn);
    });

    container.insertBefore(btnBox, document.getElementById("test-result"));
}

function removeChoiceButtons() {
    const existing = document.getElementById("choice-container");
    if (existing) existing.remove();
}

function checkChoiceAnswer(selected, correct) {
    if (selected === correct) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

function checkAnswer() {
    if (activeQuestions.length === 0) return;

    let answerInput = document.getElementById("test-answer");
    if (!answerInput) return;
    
    let userAnswer = answerInput.value.toLowerCase().trim();
    let currentItem = activeQuestions[currentQuestion];
    let isCorrect = false;

    // Сверяем ответы
    currentItem.answers.forEach(rawAns => {
        let parts = rawAns.toLowerCase().split("/").map(a => a.trim());
        if (parts.includes(userAnswer)) {
            isCorrect = true;
        }
    });

    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

function handleCorrectAnswer() {
    let item = activeQuestions[currentQuestion];
    
    // Озвучка: если это слово — озвучиваем иероглиф/слово, если кана — саму кану
    let textToSpeak = item.jp || item.kana;
    speakKana(textToSpeak);

    const resultElem = document.getElementById("test-result");
    if (resultElem) {
        resultElem.textContent = "Правильно! 🎉";
        resultElem.style.color = "green";
    }
    
    correctCount++;
    questionsAnswered++;
    
    // Переход к следующему вопросу
    currentQuestion = (currentQuestion + 1) % activeQuestions.length;
    
    const hintElem = document.getElementById("test-hint");
    if (hintElem) hintElem.innerHTML = "";

    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("wrongCount", wrongCount);
    updateStatsUI();
    
    setTimeout(() => {
        showQuestion();
    }, 500);
}

function handleWrongAnswer() {
    const resultElem = document.getElementById("test-result");
    if (resultElem) {
        resultElem.textContent = "Неправильно, попробуй ещё раз! 😅";
        resultElem.style.color = "red";
    }
    
    wrongCount++;
    
    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("wrongCount", wrongCount);
    updateStatsUI();
    
    const tAns = document.getElementById("test-answer");
    if (tAns) {
        tAns.value = "";
        tAns.focus();
    }
}

function showHint() {
    if (activeQuestions.length === 0) return;

    let question = activeQuestions[currentQuestion].kana;
    let data = katakanaData[question] || kanaData[question];

    speakKana(question);

    const hintElem = document.getElementById("test-hint");
    if (hintElem && data) {
        hintElem.innerHTML =
            "<br><strong>" + question + "</strong><br>" +
            "Читается: " + data.reading + "<br>" +
            "Пример: " + data.example + " (" + data.exampleReading + ") — " + data.meaning;
    }
}

function resetStats() {
    if (confirm("Сбросить статистику?")) {
        correctCount = 0;
        wrongCount = 0;
        localStorage.removeItem("correctCount");
        localStorage.removeItem("wrongCount");
        updateStatsUI();
    }
}

// --- БЛОК ГЕЙМИФИКАЦИИ И ПРОФИЛЯ ---

function updateStreakAndXP() {
    let lastVisit = localStorage.getItem("lastVisitDate");
    let today = new Date().toDateString();
    let streak = parseInt(localStorage.getItem("streakDays")) || 0;

    if (lastVisit !== today) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastVisit === yesterday.toDateString()) {
            streak++;
        } else if (!lastVisit) {
            streak = 1;
        } else {
            streak = 1; // Сброс, если пропустил день
        }
        localStorage.setItem("streakDays", streak);
        localStorage.setItem("lastVisitDate", today);
    }
}

function updateProfileUI() {
    updateStreakAndXP();

    const streakElem = document.getElementById("streak-days");
    const totalElem = document.getElementById("total-answers");
    const levelElem = document.getElementById("user-level");
    const rankElem = document.getElementById("user-rank");

    let correct = parseInt(localStorage.getItem("correctCount")) || 0;
    let streak = parseInt(localStorage.getItem("streakDays")) || 0;

    // Расчет уровня (каждые 10 правильных ответов = +1 уровень)
    let level = Math.floor(correct / 10) + 1;

    // Определение ранга
    let rank = "「初心者」Новичок";
    if (level >= 5) rank = "「先輩」Сэмпай";
    if (level >= 10) rank = "「先生」Сэнсэй";
    if (level >= 20) rank = "「将軍」Сёгун";

    if (streakElem) streakElem.textContent = `🔥 ${streak}`;
    if (totalElem) totalElem.textContent = `🎯 ${correct}`;
    if (levelElem) levelElem.textContent = `⭐ Lv. ${level}`;
    if (rankElem) rankElem.textContent = rank;
}

// Автоматически обновляем профиль при загрузке любой страницы
document.addEventListener("DOMContentLoaded", function () {
    updateProfileUI();
});

// --- БАЗА СЛОВ И ТЕСТЫ ПО СЛОВАМ ---

const wordsData = [
    // Люди и местоимения
    { jp: "私", reading: "watashi", ru: "я" },
    { jp: "あなた", reading: "anata", ru: "ты" },
    { jp: "友達", reading: "tomodachi", ru: "друг" },
    { jp: "先生", reading: "sensei", ru: "учитель" },
    { jp: "学生", reading: "gakusei", ru: "студент" },

    // Вежливость / База
    { jp: "はい", reading: "hai", ru: "да" },
    { jp: "いいえ", reading: "iie", ru: "нет" },
    { jp: "ありがとう", reading: "arigatou", ru: "спасибо" },
    { jp: "さようなら", reading: "sayounara", ru: "до свидания" },

    // Животные
    { jp: "猫", reading: "neko", ru: "кошка" },
    { jp: "犬", reading: "inu", ru: "собака" },
    { jp: "鳥", reading: "tori", ru: "птица" },
    { jp: "魚", reading: "sakana", ru: "рыба" },

    // Еда и напитки
    { jp: "水", reading: "mizu", ru: "вода" },
    { jp: "お茶", reading: "ocha", ru: "чай" },
    { jp: "ご飯", reading: "gohan", ru: "рис" },
    { jp: "ラーメン", reading: "raamen", ru: "рамен" },
    { jp: "パン", reading: "pan", ru: "хлеб" },
    { jp: "肉", reading: "niku", ru: "мясо" },

    // Места и объекты
    { jp: "家", reading: "ie", ru: "дом" },
    { jp: "学校", reading: "gakkou", ru: "школа" },
    { jp: "本", reading: "hon", ru: "книга" },
    { jp: "車", reading: "kuruma", ru: "машина" },
    { jp: "山", reading: "yama", ru: "гора" },
    { jp: "川", reading: "kawa", ru: "река" }
];

function switchTestType() {
    const typeSelect = document.getElementById("test-type");
    const scriptSettings = document.querySelector(".script-settings");
    
    if (!typeSelect) return;

    if (typeSelect.value === "words") {
        if (scriptSettings) scriptSettings.style.display = "none";
        
        // Создаем чистые объекты для слов
        activeQuestions = wordsData.map(w => ({
            jp: w.jp,
            kana: w.jp,
            answers: [w.ru],
            reading: w.reading,
            meaning: w.ru,
            speech: w.reading
        }));
        
        activeQuestions.sort(() => Math.random() - 0.5);
        currentQuestion = 0;
        showQuestion();
    } else {
        if (scriptSettings) scriptSettings.style.display = "flex";
        applySelectedRows();
    }
}

function showHint() {
    if (activeQuestions.length === 0) return;

    let item = activeQuestions[currentQuestion];
    const typeSelect = document.getElementById("test-type");
    const isWordsMode = typeSelect && typeSelect.value === "words";

    speakKana(item.speech || item.kana);

    const hintElem = document.getElementById("test-hint");
    if (hintElem) {
        if (isWordsMode) {
            hintElem.innerHTML =
                `<br><strong>${item.jp}</strong><br>` +
                `Чтение: ${item.reading}<br>` +
                `Перевод: ${item.meaning}`;
        } else {
            let question = item.kana;
            let data = katakanaData[question] || kanaData[question];
            if (data) {
                hintElem.innerHTML =
                    `<br><strong>${question}</strong><br>` +
                    `Читается: ${data.reading}<br>` +
                    `Пример: ${data.example} (${data.exampleReading}) — ${data.meaning}`;
            }
        }
    }
}

// --- БЛОК ТЕМ (СВЕТЛАЯ / ТЁМНАЯ / CАКУРА) ---

function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("selectedTheme", themeName);
}

function initTheme() {
    let savedTheme = localStorage.getItem("selectedTheme") || "theme-light";
    document.body.className = savedTheme;
}

// Запускаем установку темы при загрузке каждой страницы
document.addEventListener("DOMContentLoaded", function () {
    initTheme();
});

// Синхронизация с Python бэкендом
// Проверка авторизации при загрузке страницы
function checkAuthStatus() {
    fetch('/api/me')
        .then(res => {
            if (!res.ok) throw new Error('Сеть не ответила');
            return res.json();
        })
        .then(data => {
            const authText = document.getElementById('auth-status-text');
            const authBtn = document.getElementById('auth-main-btn');
            const userNameElem = document.getElementById('user-name');

            if (data && data.logged_in) {
                const user = data.user;
                if (authText) authText.textContent = `Привет, ${user.username}!`;
                if (authBtn) {
                    authBtn.textContent = 'Выйти';
                    authBtn.onclick = logoutUser;
                }
                if (userNameElem) userNameElem.textContent = user.username;

                localStorage.setItem("userName", user.username);
                localStorage.setItem("correctCount", user.correctCount);
                localStorage.setItem("wrongCount", user.wrongCount);
                localStorage.setItem("streakDays", user.streakDays);

                updateProfileUI();
            }
        })
        .catch(() => {
            // Если сервера нет — просто работаем локально без ошибок
            console.log("Режим автономной работы (LocalStorage)");
        });
}

function logoutUser() {
    fetch('/api/logout', { method: 'POST' })
        .then(() => location.reload())
        .catch(() => location.reload());
}

function syncWithServer() {
    let username = localStorage.getItem("userName");
    if (!username || username === "Ученик") return;

    let correct = parseInt(localStorage.getItem("correctCount")) || 0;
    let wrong = parseInt(localStorage.getItem("wrongCount")) || 0;
    let streak = parseInt(localStorage.getItem("streakDays")) || 0;
    let level = Math.floor(correct / 10) + 1;

    fetch(`/api/profile/${encodeURIComponent(username)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            correctCount: correct,
            wrongCount: wrong,
            streakDays: streak,
            level: level
        })
    }).catch(() => {});
}

// Вызываем синхронизацию при обновлении UI
const originalUpdateProfileUI = updateProfileUI;
updateProfileUI = function() {
    originalUpdateProfileUI();
    syncWithServer();
};