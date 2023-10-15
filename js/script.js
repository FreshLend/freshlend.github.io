var nicknameInput = document.getElementById('nickname-input');
    var readyButton = document.getElementById('ready-button');
    var messageInput = document.getElementById('message-input');
    var sendButton = document.getElementById('send-button');
    var chatMessages = document.getElementById('chat-messages');
    var nickname = '';

    readyButton.addEventListener('click', function() {
        nickname = nicknameInput.value;
        if (nickname.trim() !== '') {
            nicknameInput.disabled = true;
            readyButton.disabled = true;
            messageInput.disabled = false;
            sendButton.disabled = false;
        }
    });

    sendButton.addEventListener('click', function() {
        var message = messageInput.value;
        if (message.trim() !== '') {
            sendMessage(nickname, message);
        }
        messageInput.value = '';
    });

    function sendMessage(nickname, message) {
        var messageElement = document.createElement('div');
        messageElement.textContent = nickname + ': ' + message;
        chatMessages.appendChild(messageElement);
    }
