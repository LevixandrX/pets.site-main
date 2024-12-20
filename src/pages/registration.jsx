import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/registrationForm';
import { validateField } from '../components/validation';
import LoginModal from '../components/loginModal';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    confirm: 0,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: touchedFields[name] ? validateField(name, fieldValue, formData) : '',
    }));
  };

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const currentFieldName = e.target.name;
      const currentValue = e.target.value;

      const currentError = validateField(currentFieldName, currentValue, formData);

      if (currentError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [currentFieldName]: currentError,
        }));
        return;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [currentFieldName]: '',
      }));

      const nextField = document.getElementById(`form-${nextFieldId}`);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field], formData);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage('Пожалуйста, исправьте ошибки в форме.');
      return;
    }

    const payload = {
      ...formData,
      confirm: formData.confirm ? 1 : 0,
    };

    setLoading(true);

    try {
      const response = await fetch('https://pets.сделай.site/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 204) {
        setMessage('Регистрация успешна!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: '',
          confirm: false,
        });
        setErrors({});
      } else if (!response.ok) {
        const result = await response.json();
        if (result.error?.errors) {
          setErrors(result.error.errors);
        }
        setMessage(result.error?.message || 'Ошибка регистрации.');
      }
    } catch (err) {
      setMessage('Ошибка подключения к серверу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Регистрация</h2>
      {message && (
        <div
          className={`alert ${message.includes('ошибки') ? 'alert-danger' : 'alert-success'} shadow`}
          style={{
            animation: 'fadeIn 0.5s',
            maxWidth: '600px',
            margin: '0 auto',
            marginBottom: '20px',
            borderRadius: '10px',
          }}
        >
          {message}
        </div>
      )}
      <div
        className="card p-4 shadow-lg rounded"
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          marginBottom: '80px',
          border: '1px solid #dee2e6',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <RegistrationForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <div className="mt-4 text-center">
          <span>Уже зарегистрированы? </span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            className="bs-primary-text-emphasis"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            onClick={(e) => e.preventDefault()}
          >
            Войти
          </a>
        </div>
      </div>

      {/* Модальное окно для входа */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Вход
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <LoginModal
                onLoginSuccess={() => {
                  document.querySelector('[data-bs-dismiss="modal"]').click();
                  handleLoginSuccess();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;