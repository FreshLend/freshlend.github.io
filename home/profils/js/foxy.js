  // Устанавливаем начальную дату
  var startDate = new Date("2009.07.09");

  // Получаем текущую дату
  var currentDate = new Date();

  // Вычисляем количество прошедших лет
  var yearsPassed = currentDate.getFullYear() - startDate.getFullYear();

  // Вычисляем значение счетчика
  var counterValue = 0 + yearsPassed;

  // Обновляем текст в элементе с id "counter"
  document.getElementById("counter").textContent = counterValue;
