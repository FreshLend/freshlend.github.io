// Получаем элемент span с id "online-users"
var onlineUsersElement = document.getElementById("online-users");

// Функция для обновления количества пользователей онлайн
function updateOnlineUsers(count) {
  onlineUsersElement.textContent = count;
}

// Пример обновления количества пользователей (может быть использован на сервере)
updateOnlineUsers(10);