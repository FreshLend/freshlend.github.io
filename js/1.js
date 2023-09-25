    var onlineCount = 0;

    // Создание WebSocket-соединения
    var socket = WebSocket("ws://freshlend.github.io/counter");

    // Обработка события открытия соединения
    socket.onopen = function(event) {
      console.log("WebSocket connection opened");
    };

    // Обработка события получения сообщения от сервера
    socket.onmessage = function(event) {
      onlineCount = parseInt(event.data);
      updateCount();
    };

    // Обработка события закрытия соединения
    socket.onclose = function(event) {
      console.log("WebSocket connection closed");
    };

    function updateCount() {
      var countElement = document.getElementById("count");
      countElement.innerText = onlineCount;
    }
