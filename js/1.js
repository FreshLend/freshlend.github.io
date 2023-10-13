var nicknameEntered = false;

        function checkNickname() {
    var nickname = document.getElementById("nickname").value;
    if (nickname.trim() === "FreshGame" || nickname.trim() === "FreshGame_Dev" || nickname.trim() === "FreshLend") {
        var password = prompt("Введите пароль:");
        if (password === "FreshLend12FreshLend") {
            nicknameEntered = true;
            document.getElementById("nickname-input").style.display = "none";
            document.getElementById("message-input").style.display = "block";
            document.getElementById("nickname").style.color = "darkred";
            document.getElementById("chat-messages").style.color = "red";
        } else {
            alert("Неверный пароль. Попробуйте еще раз.");
        }
    } else {
        nicknameEntered = true;
        document.getElementById("nickname-input").style.display = "none";
        document.getElementById("message-input").style.display = "block";
        document.getElementById("nickname").style.color = "black";
        document.getElementById("chat-messages").style.color = "aqua";
    }
}

        function sendMessage() {
    var nickname = document.getElementById("nickname").value;
    var message = document.getElementById("message").value;
    var chatMessages = document.getElementById("chat-messages");

    var chatMessage = document.createElement("p");
    chatMessage.innerHTML = "<strong>" + nickname + ":</strong> " + message;

    // Ограничение символов в сообщении
    if (message.length > 1024) {
        alert("Максимальное количество символов в сообщении: 1024");
        return;
    }

    // Удаление старых сообщений при превышении 3
    if (chatMessages.childElementCount >= 3) {
        chatMessages.removeChild(chatMessages.firstChild);
    }

    chatMessages.appendChild(chatMessage);

    // Очистка поля ввода сообщения
    document.getElementById("message").value = "";
        }
