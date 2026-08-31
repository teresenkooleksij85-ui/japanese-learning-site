// ============================================================
// ГОСТЕВАЯ КНИГА
// ============================================================

let messages = [];

function loadMessages() {
    try {
        var data = localStorage.getItem('nihongo_messages');
        messages = data ? JSON.parse(data) : [];
        if (messages.length === 0) {
            messages.push({
                id: Date.now(),
                username: 'NihongoGo',
                text: currentLang === 'ru' ? '👋 Добро пожаловать! Оставь своё первое сообщение!' : '👋 Welcome! Leave your first message!',
                date: new Date().toISOString(),
                isSystem: true,
                replies: [],
                likes: [],
                dislikes: []
            });
            saveMessages();
        }
    } catch(e) {
        messages = [];
    }
    renderMessages();
}

function saveMessages() {
    localStorage.setItem('nihongo_messages', JSON.stringify(messages));
}

function sendMessage(parentId) {
    if (!currentUser) {
        var errorEl = document.getElementById('messageError');
        if (errorEl) {
            errorEl.textContent = currentLang === 'ru' ? '❌ Войди в аккаунт, чтобы писать!' : '❌ Log in to write!';
            errorEl.classList.remove('hidden');
            setTimeout(function() { errorEl.classList.add('hidden'); }, 3000);
        }
        return;
    }

    var input = document.getElementById(parentId ? 'replyInput_' + parentId : 'messageInput');
    if (!input) return;
    var text = input.value.trim();
    if (!text) {
        var errorEl = document.getElementById('messageError');
        if (errorEl) {
            errorEl.textContent = currentLang === 'ru' ? '❌ Напиши сообщение!' : '❌ Write a message!';
            errorEl.classList.remove('hidden');
            setTimeout(function() { errorEl.classList.add('hidden'); }, 3000);
        }
        return;
    }

    if (text.length > 500) {
        var errorEl = document.getElementById('messageError');
        if (errorEl) {
            errorEl.textContent = currentLang === 'ru' ? '❌ Слишком длинное сообщение (макс. 500 символов)' : '❌ Message too long (max 500 chars)';
            errorEl.classList.remove('hidden');
            setTimeout(function() { errorEl.classList.add('hidden'); }, 3000);
        }
        return;
    }

    if (parentId) {
        var parent = messages.find(function(m) { return m.id === parentId; });
        if (parent) {
            if (!parent.replies) parent.replies = [];
            parent.replies.push({
                id: Date.now() + Math.random() * 1000,
                username: currentUser,
                text: text,
                date: new Date().toISOString(),
                likes: [],
                dislikes: []
            });
            saveMessages();
            renderMessages();
            input.value = '';
            showNotification('✅', currentLang === 'ru' ? 'Ответ отправлен!' : 'Reply sent!', '');
            completeQuest('comment', 20, currentLang === 'ru' ? '💬 Комментарий отправлен!' : '💬 Comment sent!', '+20 XP');
        }
    } else {
        var newMessage = {
            id: Date.now(),
            username: currentUser,
            text: text,
            date: new Date().toISOString(),
            isSystem: false,
            replies: [],
            likes: [],
            dislikes: []
        };
        messages.unshift(newMessage);
        saveMessages();
        renderMessages();
        input.value = '';
        showNotification('✅', currentLang === 'ru' ? 'Сообщение отправлено!' : 'Message sent!', '');
        completeQuest('comment', 20, currentLang === 'ru' ? '💬 Комментарий отправлен!' : '💬 Comment sent!', '+20 XP');
    }
}

function reactToMessage(messageId, type) {
    if (!currentUser) {
        showNotification('🔐', currentLang === 'ru' ? 'Войди в аккаунт' : 'Log in', currentLang === 'ru' ? 'Чтобы ставить реакции' : 'To react');
        return;
    }

    var findMessage = function(msgList, id) {
        for (var i = 0; i < msgList.length; i++) {
            if (msgList[i].id === id) return msgList[i];
            if (msgList[i].replies) {
                var found = msgList[i].replies.find(function(r) { return r.id === id; });
                if (found) return found;
            }
        }
        return null;
    };

    var msg = findMessage(messages, messageId);
    if (!msg) return;
    if (!msg.likes) msg.likes = [];
    if (!msg.dislikes) msg.dislikes = [];

    if (type === 'like') {
        var idx = msg.dislikes.indexOf(currentUser);
        if (idx !== -1) msg.dislikes.splice(idx, 1);
        var likeIdx = msg.likes.indexOf(currentUser);
        if (likeIdx !== -1) msg.likes.splice(likeIdx, 1);
        else msg.likes.push(currentUser);
    } else if (type === 'dislike') {
        var idx = msg.likes.indexOf(currentUser);
        if (idx !== -1) msg.likes.splice(idx, 1);
        var dislikeIdx = msg.dislikes.indexOf(currentUser);
        if (dislikeIdx !== -1) msg.dislikes.splice(dislikeIdx, 1);
        else msg.dislikes.push(currentUser);
    }

    saveMessages();
    renderMessages();
}

function deleteMessage(id) {
    if (!currentUser) return;

    var findAndRemove = function(list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                if (list[i].username === currentUser || currentUser === 'admin') {
                    list.splice(i, 1);
                    return true;
                }
                return false;
            }
            if (list[i].replies) {
                for (var j = 0; j < list[i].replies.length; j++) {
                    if (list[i].replies[j].id === id) {
                        if (list[i].replies[j].username === currentUser || currentUser === 'admin') {
                            list[i].replies.splice(j, 1);
                            return true;
                        }
                        return false;
                    }
                }
            }
        }
        return false;
    };

    var removed = findAndRemove(messages);
    if (removed) {
        saveMessages();
        renderMessages();
        showNotification('🗑️', currentLang === 'ru' ? 'Сообщение удалено' : 'Message deleted', '');
    } else {
        showNotification('⛔', currentLang === 'ru' ? 'Нельзя удалить чужое сообщение!' : 'Cannot delete someone else\'s message!', '');
    }
}

function toggleReplyForm(id) {
    var form = document.getElementById('replyForm_' + id);
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
        if (form.style.display === 'block') {
            var input = document.getElementById('replyInput_' + id);
            if (input) input.focus();
        }
    }
}

function renderMessages() {
    var container = document.getElementById('messagesList');
    if (!container) return;

    var form = document.getElementById('messageForm');
    var guestMsg = document.getElementById('guestMessage');
    
    if (currentUser) {
        if (form) form.style.display = 'block';
        if (guestMsg) guestMsg.style.display = 'none';
    } else {
        if (form) form.style.display = 'none';
        if (guestMsg) guestMsg.style.display = 'block';
    }

    if (messages.length === 0) {
        container.innerHTML = '<p style="color:#6c6e8a; text-align:center; padding:20px;">' + (currentLang === 'ru' ? 'Пока нет сообщений. Будь первым!' : 'No messages yet. Be the first!') + '</p>';
        return;
    }

    var html = '';
    messages.forEach(function(msg) {
        html += renderMessageItem(msg, 0);
    });
    container.innerHTML = html;
}

function renderMessageItem(msg, depth) {
    var date = new Date(msg.date);
    var dateStr = date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    var isOwn = currentUser === msg.username || currentUser === 'admin';
    var isSystem = msg.isSystem || false;
    var likes = msg.likes ? msg.likes.length : 0;
    var dislikes = msg.dislikes ? msg.dislikes.length : 0;
    var userLiked = currentUser && msg.likes && msg.likes.indexOf(currentUser) !== -1;
    var userDisliked = currentUser && msg.dislikes && msg.dislikes.indexOf(currentUser) !== -1;
    var replies = msg.replies || [];
    var hasReplies = replies.length > 0;
    var marginLeft = depth * 30;

    var html = '<div style="margin-left:' + marginLeft + 'px; background:' + (isSystem ? '#0f0e17' : (isOwn ? '#1a2a2e' : '#1a1a2e')) + '; border:1px solid ' + (isSystem ? '#2a2a4a' : (isOwn ? '#e94560' : '#2a2a4a')) + '; border-radius:14px; padding:12px 16px; margin-bottom:10px; transition:0.3s;">' +
        '<div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:6px;">' +
            '<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">' +
                '<strong style="color:' + (isSystem ? '#6c6e8a' : (isOwn ? '#e94560' : '#fffffe')) + '; font-size:14px;">' + msg.username + '</strong>' +
                '<span style="color:#6c6e8a; font-size:11px;">' + dateStr + '</span>' +
                (isSystem ? '<span style="background:#2a2a4a; color:#6c6e8a; font-size:10px; padding:2px 10px; border-radius:20px;">📌 Система</span>' : '') +
            '</div>' +
            '<div style="display:flex; align-items:center; gap:6px;">' +
                (!isSystem ? '<button onclick="reactToMessage(' + msg.id + ', \'like\')" style="background:transparent; border:none; color:' + (userLiked ? '#4CAF50' : '#6c6e8a') + '; cursor:pointer; font-size:14px; padding:2px 4px; transition:0.3s;" title="' + (currentLang === 'ru' ? 'Лайк' : 'Like') + '">👍 <span style="font-size:12px;">' + likes + '</span></button>' : '') +
                (!isSystem ? '<button onclick="reactToMessage(' + msg.id + ', \'dislike\')" style="background:transparent; border:none; color:' + (userDisliked ? '#f44336' : '#6c6e8a') + '; cursor:pointer; font-size:14px; padding:2px 4px; transition:0.3s;" title="' + (currentLang === 'ru' ? 'Дизлайк' : 'Dislike') + '">👎 <span style="font-size:12px;">' + dislikes + '</span></button>' : '') +
                (!isSystem && isOwn ? '<button onclick="deleteMessage(' + msg.id + ')" style="background:transparent; border:none; color:#f44336; cursor:pointer; font-size:16px; padding:0 4px;" title="' + (currentLang === 'ru' ? 'Удалить' : 'Delete') + '">🗑️</button>' : '') +
            '</div>' +
        '</div>' +
        '<div style="color:#fffffe; font-size:14px; margin-top:6px; word-wrap:break-word; white-space:pre-wrap;">' + msg.text + '</div>' +
        (!isSystem ? '<div style="margin-top:8px;"><button onclick="toggleReplyForm(' + msg.id + ')" style="background:transparent; border:none; color:#a7a9be; cursor:pointer; font-size:12px; padding:2px 6px; transition:0.3s; text-decoration:underline;">💬 ' + (currentLang === 'ru' ? 'Ответить' : 'Reply') + '</button>' +
            '<div id="replyForm_' + msg.id + '" style="display:none; margin-top:8px;">' +
                '<div style="display:flex; gap:8px; flex-wrap:wrap;">' +
                    '<input type="text" id="replyInput_' + msg.id + '" placeholder="' + (currentLang === 'ru' ? 'Напишите ответ...' : 'Write a reply...') + '" style="flex:1; min-width:150px; padding:8px 12px; border-radius:10px; border:1px solid #2a2a4a; background:#0f0e17; color:white; font-size:13px; outline:none;">' +
                    '<button onclick="sendMessage(' + msg.id + ')" style="background:#e94560; color:white; border:none; padding:8px 16px; border-radius:10px; font-weight:700; cursor:pointer; font-size:13px; transition:0.3s;">' + (currentLang === 'ru' ? 'Ответить' : 'Reply') + '</button>' +
                    '<button onclick="toggleReplyForm(' + msg.id + ')" style="background:#2a2a4a; color:#a7a9be; border:none; padding:8px 16px; border-radius:10px; font-weight:700; cursor:pointer; font-size:13px; transition:0.3s;">✕</button>' +
                '</div>' +
            '</div></div>' : '') +
    '</div>';

    if (hasReplies) {
        replies.forEach(function(reply) {
            html += renderMessageItem(reply, depth + 1);
        });
    }

    return html;
}

window.messages = messages;
window.loadMessages = loadMessages;
window.saveMessages = saveMessages;
window.sendMessage = sendMessage;
window.reactToMessage = reactToMessage;
window.deleteMessage = deleteMessage;
window.toggleReplyForm = toggleReplyForm;
window.renderMessages = renderMessages;
window.renderMessageItem = renderMessageItem;

console.log('✅ guestbook.js загружен!');