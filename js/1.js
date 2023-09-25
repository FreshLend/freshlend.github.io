document.addEventListener("DOMContentLoaded", function() {
  var currentDate = new Date();  // текущая дата
  var targetDate = new Date("2021-08-07");  // целевая дата

  var timeDiff = Math.abs(currentDate.getTime() - targetDate.getTime());  // разница в миллисекундах
  var yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));  // разница в годах

  var countElement = document.getElementById("count");
  countElement.innerText = "Прошло " + yearsDiff + " лет с 7 августа 2021 года.";
});
