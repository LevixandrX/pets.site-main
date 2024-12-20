import React, { useState, useRef, useEffect } from 'react';

const LoginModal = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const passwordRef = useRef(null);

  // Валидация email
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (validateEmail(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Некорректный email' }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !errors.email) {
      e.preventDefault();
      passwordRef.current.focus(); // Фокус на поле пароля
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
    setMessage('');
  };

  // Сброс формы при закрытии модального окна
  useEffect(() => {
    const modalElement = document.getElementById('loginModal');
    modalElement.addEventListener('hidden.bs.modal', resetForm);

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', resetForm);
    };
  }, []);

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация полей
    const newErrors = {};
    if (!email) newErrors.email = 'Email обязателен';
    else if (!validateEmail(email)) newErrors.email = 'Некорректный email';
    if (!password) newErrors.password = 'Пароль обязателен';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage('Пожалуйста, исправьте ошибки в форме.');
      return;
    }

    // Отправка запроса на сервер
    try {
      const response = await fetch('https://pets.сделай.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.data.token); // Сохраняем токен
        setMessage('Вход выполнен успешно!');
        setTimeout(() => {
          setMessage('');
          onLoginSuccess(); // Редирект после авторизации
        }, 1000);
      } else {
        const errorData = await response.json();
        if (response.status === 422) {
          setErrors(errorData.error.errors || {});
          setMessage(errorData.error.message || 'Ошибка валидации.');
        } else if (response.status === 401) {
          setMessage('Неверный email или пароль.');
        } else {
          setMessage('Произошла ошибка. Попробуйте позже.');
        }
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setMessage('Ошибка подключения к серверу.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div
          className={`alert ${
            message.includes('успешно') ? 'alert-success' : 'alert-danger'
          }`}
        >
          {message}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          placeholder="Введите email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">Пароль</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100 py-2">
        Войти
      </button>
      <div className="mt-3 text-center">
        <span>Нет аккаунта? </span>
        <a href="/registration" className="bs-primary-text-emphasis">Зарегистрироваться</a>
      </div>
    </form>
  );
};

export default LoginModal;