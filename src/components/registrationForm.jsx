import React from 'react';
import FormField from './formField';

const RegistrationForm = ({
  formData,
  errors,
  handleChange,
  handleKeyDown,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        id="name"
        label="Имя"
        value={formData.name}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'phone')}
        error={errors.name}
      />
      <FormField
        id="phone"
        label="Телефон"
        value={formData.phone}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'email')}
        error={errors.phone}
      />
      <FormField
        id="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'password')}
        error={errors.email}
      />
      <FormField
        id="password"
        label="Пароль"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'password_confirmation')}
        error={errors.password}
      />
      <FormField
        id="password_confirmation"
        label="Подтверждение пароля"
        type="password"
        value={formData.password_confirmation}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'confirm')}
        error={errors.password_confirmation}
      />
      <FormField
        id="confirm"
        label="Согласие на обработку данных"
        type="checkbox"
        value={formData.confirm}
        onChange={handleChange}
        error={errors.confirm}
      />
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 mt-3"
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;