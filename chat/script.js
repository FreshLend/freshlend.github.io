// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Эндпоинт для получения сообщений
app.get('/chat', (req, res) => {
  fs.readFile('chat.txt', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.send(data);
    }
  });
});

// Эндпоинт для сохранения сообщений
app.post('/chat', (req, res) => {
  const message = req.body.message + '\n';  // Добавление новой строки
  fs.appendFile('chat.txt', message, (err) => {
    if (err) {
      res.status(500).send('Unable to save the message');
    } else {
      res.status(200).send('Message saved');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});




// Helper function to get current timestamp
function getCurrentTimestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

// Helper function to store chat messages to chat.txt
function storeChatMessages(message) {
  fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Load previous chat messages if available
function loadChatMessages() {
  fetch('http://localhost:3000/chat')
    .then((response) => response.text())
    .then((data) => {
      const chatContainer = document.getElementById('messages-container');
      chatContainer.innerHTML = data.replace(/\n/g, '<br>'); // Конвертируем новые строки в теги <br> для HTML
      chatContainer.scrollTop = chatContainer.scrollHeight; // Прокручиваем до последнего сообщения
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Check if a nickname requires a password
function requiresPassword(nickname) {
  const protectedNicknames = [
    'FreshGame',
    'FreshLend',
    'FreshGame_YT',
    'FreshLend Studio',
    'Admin',
    'Administrator'
  ];
  return protectedNicknames.includes(nickname);
}

// Hide nickname input and button after submission
function hideInputAndButton() {
  const nicknameInput = document.getElementById('nickname-input');
  const nicknameButton = document.getElementById('nickname-button');
  const messageInput = document.getElementById('message-input');
  const messageButton = document.getElementById('message-button');
  const refreshButton = document.getElementById('refresh-button');

  nicknameInput.style.display = 'none';
  nicknameButton.style.display = 'none';
  messageInput.disabled = false;
  messageButton.disabled = false;
  refreshButton.style.display = 'inline';
}

// Handle nickname submission
function handleNicknameSubmission() {
  const nicknameInput = document.getElementById('nickname-input');
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.getElementById('messages-container');
  const nickname = nicknameInput.value.trim();

  if (nickname) {
    if (requiresPassword(nickname)) {
      const password = prompt('Enter password:');
      if (password === 'Fr12AqWFr') {
        hideInputAndButton();
        nicknameInput.classList.add('dark-red-text');
        messagesContainer.innerHTML += `<p><strong>${getCurrentTimestamp()} (${nickname}):</strong> Password verified</p>`;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else {
        alert('Password incorrect. Please try again.');
      }
    } else {
      hideInputAndButton();
      nicknameInput.classList.add('grey-text');
      messagesContainer.innerHTML += `<p><strong>${getCurrentTimestamp()} (${nickname}):</strong> Entered the chat</p>`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}

// Handle message submission
function handleMessageSubmission() {
  const nicknameInput = document.getElementById('nickname-input');
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.getElementById('messages-container');
  const nickname = nicknameInput.value.trim();
  const message = messageInput.value.trim();

  if (message) {
    messagesContainer.innerHTML += `<p><strong>${getCurrentTimestamp()} (${nickname}):</strong> ${message}</p>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    messageInput.value = '';

    // Trim chat messages if more than 50
    const chatMessages = Array.from(messagesContainer.getElementsByTagName('p'));
    if (chatMessages.length > 50) {
      messagesContainer.removeChild(chatMessages[0]);
    }

    // Store chat messages to chat.txt
    const updatedMessages = chatMessages.map((chatMessage) => chatMessage.outerHTML);
    storeChatMessages(updatedMessages);
  }
}

// Получить HTML всех сообщений
  const updatedMessages = chatMessages.map((chatMessage) => chatMessage.outerHTML).join('\n');
  // Отправить сообщения на сервер для сохранения
  storeChatMessages(updatedMessages);
}

// Refresh chat by loading messages again
function refreshChat() {
  const messagesContainer = document.getElementById('messages-container');
  messagesContainer.innerHTML = ''; // Очистка контейнера сообщений
  loadChatMessages();
}

// Add event listeners
window.addEventListener('DOMContentLoaded', () => {
  const nicknameInput = document.getElementById('nickname-input');
  const nicknameButton = document.getElementById('nickname-button');
  const messageInput = document.getElementById('message-input');
  const messageButton = document.getElementById('message-button');
  const refreshButton = document.getElementById('refresh-button');

  nicknameInput.addEventListener('input', function () {
    nicknameButton.disabled = !this.value.trim();
  });

  nicknameButton.addEventListener('click', handleNicknameSubmission);

  messageInput.addEventListener('input', function () {
    messageButton.disabled = !this.value.trim();
  });

  messageButton.addEventListener('click', handleMessageSubmission);

  refreshButton.addEventListener('click', refreshChat);

  loadChatMessages();
});
