import React, { useState } from 'react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Введите корректный email.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://pets.сделай.site/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setServerError(errorData.error?.message || 'Ошибка сервера. Попробуйте позже.');
        return;
      }

      setSubmitted(true);
      setEmail('');
      setError('');
      setServerError('');
    } catch (err) {
      console.error('Ошибка подключения:', err);
      setServerError('Не удалось подключиться к серверу. Попробуйте позже.');
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-center text-white bg-primary m-3">Подписка на новости</h2>
      <form
        className="w-50 m-auto p-3 mb-4"
        style={{ minWidth: '300px' }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Введите адрес электронной почты
          </label>
          <input
            type="email"
            className={`form-control ${error || serverError ? 'is-invalid' : ''}`}
            id="emailInput"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
              if (serverError) setServerError('');
            }}
            aria-describedby="emailHelp"
            disabled={loading}
          />
          {(error || serverError) && (
            <div className="invalid-feedback">{error || serverError}</div>
          )}
          <div id="emailHelp" className="form-text">
            Мы никогда не делимся Вашими e-mail ни с кем.
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Подписаться'}
        </button>
      </form>

      {submitted && (
        <div className="alert alert-success mt-4 fade show" role="alert">
          Спасибо за подписку! Мы отправим вам новости на указанный email.
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;