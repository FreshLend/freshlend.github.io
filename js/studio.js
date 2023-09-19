// Устанавливаем начальную дату
var startDate = new Date("2021.06.09");

// Получаем текущую дату
var currentDate = new Date();

// Вычисляем количество прошедших лет
var yearsPassed = currentDate.getFullYear() - startDate.getFullYear();

// Вычисляем значение счетчика
var counterValue = 0 + yearsPassed;

// Получаем текущий год, месяц и день
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1; // добавляем 1, так как месяцы в JavaScript начинаются с 0
var currentDay = currentDate.getDate();

// Обновляем текст в элементе с id "counter" и отображаем текущий год, месяц и день
document.getElementById("counter").textContent = counterValue;
document.getElementById("year").textContent = currentYear;
document.getElementById("month").textContent = currentMonth;
document.getElementById("day").textContent = currentDay;
