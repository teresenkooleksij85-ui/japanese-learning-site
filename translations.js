const translations = {
    ru: {
        back_main: "← На главную",
        back_menu: "← Главное меню",
        about_title: "О проекте 🌸",
        about_desc: "Этот сайт создан для того, чтобы сделать изучение японского языка простым, интерактивным и интересным!",
        mission_title: "🎯 Наша миссия",
        mission_desc: "Помочь новичкам освоить азбуки Хирагана и Катакана, базовую грамматику и словарный запас без нудной зубрёжки.",
        roadmap_title: "🗺️ Планы по развитию (Roadmap)",
        roadmap_1: "Запуск базовой версии сайта и бэкенда на Flask",
        roadmap_2: "Размещение сайта в интернете",
        roadmap_3: "Интерактивные тренажёры для запоминания Иероглифов (Кандзи)",
        roadmap_4: "Система личного кабинета и сохранения прогресса",
        roadmap_5: "Аудио-произношение для всех слов и фразочек",
        roadmap_6: "Мини-игры для проверки знаний",
        feedback_title: "💬 Обратная связь",
        feedback_desc: "Проект активно развивается! Если у вас есть идеи или вы нашли ошибку, пишите нам!",
        achievements_title: "実績 (Достижения)",
        achievements_subtitle: "Твой личный прогресс и награды 🏆",
        grammar_title: "文法 (Грамматика)",
        grammar_subtitle: "Базовые и продвинутые конструкции японского языка для изучения 📚"
    },
    en: {
        back_main: "← Back to Main",
        back_menu: "← Main Menu",
        about_title: "About the Project 🌸",
        about_desc: "This website was created to make learning Japanese simple, interactive, and fun!",
        mission_title: "🎯 Our Mission",
        mission_desc: "To help beginners master Hiragana and Katakana alphabets, basic grammar, and core vocabulary without tedious cramming.",
        roadmap_title: "🗺️ Roadmap",
        roadmap_1: "Launch basic website version and Flask backend",
        roadmap_2: "Deploy website online",
        roadmap_3: "Interactive trainers for memorizing Kanji",
        roadmap_4: "User account system and progress tracking",
        roadmap_5: "Audio pronunciation for all words and phrases",
        roadmap_6: "Mini-games to test your knowledge",
        feedback_title: "💬 Feedback",
        feedback_desc: "The project is actively developing! If you have ideas or found a bug, write to us!",
        achievements_title: "実績 (Achievements)",
        achievements_subtitle: "Your personal progress and awards 🏆",
        grammar_title: "文法 (Grammar)",
        grammar_subtitle: "Basic and advanced Japanese language structures for learning 📚"
    }
};

// Функция переключения и сохранения языка
function setLanguage(lang) {
    localStorage.setItem('selected_lang', lang);
    
    // Находим все элементы с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Обновляем текст на самой кнопке
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.textContent = lang === 'ru' ? '🌐 RU' : '🌐 EN';
    }
}

// Вызывается при нажатии на кнопку
window.toggleLanguage = function() {
    const currentLang = localStorage.getItem('selected_lang') || 'ru';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
};

// Автоматически применяем выбранный язык при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selected_lang') || 'ru';
    setLanguage(savedLang);
});