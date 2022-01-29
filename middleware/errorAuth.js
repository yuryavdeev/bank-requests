const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не существует!',
  INVALID_PASSWORD: 'Пароль или email введены неправильно! ',
}

// используется в store/login.js
export function createErrorMessage(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
