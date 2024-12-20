export const validateField = (name, value = '', formData = {}, isAuthenticated) => {
  let errorMessage = '';

  switch (name) {
    case 'name':
      if (!value.trim()) {
        errorMessage = 'Имя обязательно';
      } else if (!/^[А-Яа-яЁё\s-]+$/.test(value)) {
        errorMessage = 'Имя может содержать только кириллицу, пробелы и дефисы';
      }
      break;

    case 'phone':
      if (!value.trim()) {
        errorMessage = 'Телефон обязателен';
      } else if (!/^\+?\d{10,15}$/.test(value)) {
        errorMessage = 'Номер телефона должен быть в формате +XXXXXXXXXXX';
      }
      break;

    case 'email':
      if (!value.trim()) {
        errorMessage = 'Email обязателен';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Некорректный email';
      }
      break;

    case 'password':
      if (!isAuthenticated) {
        if (!value.trim()) {
          errorMessage = 'Пароль обязателен';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/.test(value)) {
          errorMessage = 'Пароль должен содержать минимум 7 символов, 1 цифру, 1 строчную и 1 заглавную букву';
        }
      }
      break;

    case 'password_confirmation':
      if (!isAuthenticated) {
        if (!value.trim()) {
          errorMessage = 'Подтверждение пароля обязательно';
        } else if (formData.password && value !== formData.password) {
          errorMessage = 'Пароли не совпадают';
        }
      }
      break;

    case 'photo1':
      if (!value) {
        errorMessage = 'Фото 1 обязательно';
      } else if (value.name && !/\.(png)$/i.test(value.name)) {
        errorMessage = 'Фото 1 должно быть изображением (формат png)';
      }
      break;

    case 'photo2':
    case 'photo3':
      if (value && value.name && !/\.(png)$/i.test(value.name)) {
        errorMessage = 'Фото должно быть изображением (формат png)';
      }
      break;

    case 'kind':
      if (!value.trim()) {
        errorMessage = 'Укажите вид животного';
      }
      break;

    case 'district':
      if (!value.trim()) {
        errorMessage = 'Укажите район';
      }
      break;

    case 'confirm':
      if (!value) {
        errorMessage = 'Подтверждение обязательно';
      }
      break;

    default:
      break;
  }

  return errorMessage;
};