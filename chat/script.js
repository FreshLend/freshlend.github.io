// Helper function to get current timestamp
function getCurrentTimestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

// Helper function to store chat messages to chat.txt
function storeChatMessages(messages) {
  const txt = messages.join('\n');
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const anchor = document.createElement('a');
  anchor.download = 'chat.txt';
  anchor.href = URL.createObjectURL(blob);
  anchor.click();
}

// Load previous chat messages if available
function loadChatMessages() {
  fetch('chat.txt')
    .then((response) => response.text())
    .then((data) => {
      const chatContainer = document.getElementById('messages-container');
      chatContainer.innerHTML = data;
      chatContainer.scrollTop = chatContainer.scrollHeight;
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
