// Получаем элемент span с id "online-users"
var onlineUsersElement = document.getElementById("online-users");

// Функция для обновления количества пользователей онлайн
function updateOnlineUsers(count) {
  onlineUsersElement.textContent = count;
}

// Пример обновления количества пользователей (может быть использован на сервере)
updateOnlineUsers(10);
// При входе пользователя
function userLogin() {
  // Отправить запрос на сервер для регистрации входа пользователя
  // Обновить счетчик пользователей онлайн
  updateOnlineUsers(onlineUsers + 1); // Предполагается, что у вас есть переменная onlineUsers, хранящая текущее количество пользователей онлайн
}

// При выходе пользователя
function userLogout() {
  // Отправить запрос на сервер для регистрации выхода пользователя
  // Обновить счетчик пользователей онлайн
  updateOnlineUsers(onlineUsers - 1); // Предполагается, что у вас есть переменная onlineUsers, хранящая текущее количество пользователей онлайн
}
