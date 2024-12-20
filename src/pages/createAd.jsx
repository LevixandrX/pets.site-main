import React, { useState, useRef, useEffect } from 'react';
import AdForm from '../components/adForm';
import { validateField } from '../components/validation';

const CreateAd = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    register: false,
    password: '',
    password_confirmation: '',
    photo1: null,
    photo2: null,
    photo3: null,
    photo1Preview: null,
    photo2Preview: null,
    photo3Preview: null,
    mark: '',
    description: '',
    confirm: 0,
    kind: '',
    district: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Проверка авторизации

  const fileInputRefs = {
    photo1: useRef(),
    photo2: useRef(),
    photo3: useRef(),
  };

  // Проверка авторизации и загрузка данных пользователя
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const fetchUserData = async () => {
        try {
          const response = await fetch('https://pets.сделай.site/api/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error('Ошибка при загрузке данных пользователя.');
          const userData = await response.json();

          setFormData((prevFormData) => ({
            ...prevFormData,
            name: userData.name || '',
            phone: userData.phone || '',
            email: userData.email || '',
            password: userData.password || '', // Проверка наличия данных
            password_confirmation: userData.password_confirmation || '', // Проверка наличия данных
          }));
        } catch (error) {
          setMessage('Не удалось загрузить данные пользователя');
          console.error(error);
        }
      };
      fetchUserData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated && !formData.name) {
    return <div className="text-center mt-4">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', marginTop: '250px' }}>
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <p className="mt-3">Загрузка данных...</p>
    </div>
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Обработка файлов и превью
    if (type === 'file') {
      const file = files.length > 0 ? files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
            [`${name}Preview`]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: null,
          [`${name}Preview`]: null,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: fieldValue,
      }));
    }

    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: touchedFields[name] ? validateField(name, fieldValue, formData) : '',
    }));
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
      const error = validateField(field, formData[field], formData, isAuthenticated);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage('Пожалуйста, исправьте ошибки в форме.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('kind', formData.kind);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('mark', formData.mark);
    formDataToSend.append('confirm', formData.confirm ? 1 : 0);
    formDataToSend.append('published_at', new Date().toISOString());

    if (!isAuthenticated && formData.register) {
      formDataToSend.append('password', formData.password);
      formDataToSend.append('password_confirmation', formData.password_confirmation);
    }

    if (formData.photo1) formDataToSend.append('photos1', formData.photo1);
    if (formData.photo2) formDataToSend.append('photos2', formData.photo2);
    if (formData.photo3) formDataToSend.append('photos3', formData.photo3);

    setLoading(true);
    try {
      const response = await fetch('https://pets.сделай.site/api/pets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: formDataToSend,
      });
      

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        setMessage(`Объявление успешно добавлено! ID: ${responseData.data.id}`);

        
      } else {
        const responseData = await response.json();
        setErrors(responseData.error.errors);
        setMessage('Ошибка валидации данных.');
      }
    } catch (err) {
      setMessage('Ошибка при отправке данных на сервер.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePreview = (photoId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${photoId}`]: null,
      [`${photoId}Preview`]: null,
    }));

    if (fileInputRefs[photoId].current) {
      fileInputRefs[photoId].current.value = '';
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Добавление объявления</h2>
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
        <AdForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
          loading={loading}
          handleRemovePreview={handleRemovePreview}
          fileInputRefs={fileInputRefs}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default CreateAd;