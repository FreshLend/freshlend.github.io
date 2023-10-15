document.addEventListener('DOMContentLoaded', function() {
    var messageInput = document.getElementById('message-input');
    var sendButton = document.getElementById('send-button');
    var chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', function() {
        var message = messageInput.value;
        if (message.trim() !== '') {
            sendMessage(message);
        }
        messageInput.value = '';
    });

    function sendMessage(message) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'send_message.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                displayMessage(response);
            }
        };
        xhr.send('message=' + encodeURIComponent(message));
    }

    function displayMessage(message) {
        var messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
    }
});
