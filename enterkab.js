
//вход в личный кабинет
let isLoggedIn = false;

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Предотвращаем стандартную отправку формы

  const login = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // Функция проверки данных пользователя
  if (checkCredentials(login, password)) {

    // Перенаправление в личный кабинет или обновление интерфейса
    window.location.href = "index2.html"; // замените на ваш URL
    
  } else {
    alert('Некорректный логин или пароль');
  }
});

// Функция проверки логина и пароля
function checkCredentials(login, password) {
  // В реальной ситуации проверка идет через сервер,
  // здесь это пример с жестко зафиксированными данными
  const validLogin = 'admin';
  const validPassword = '1234';

  return login === validLogin && password === validPassword;
  return isLoggedIn = true;
}
