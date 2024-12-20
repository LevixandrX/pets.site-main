import React, { useState, useEffect } from 'react';
import ProfileContent from '../components/profileContent';
import UserOrders from '../components/userOrders';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/registration');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const userResponse = await fetch('https://pets.сделай.site/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Ошибка авторизации. Пожалуйста, войдите снова.');
        }

        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Ошибка:', error.message);
        setNotification({ message: error.message, type: 'danger' });

        if (error.message === 'Ошибка авторизации. Пожалуйста, войдите снова.') {
          localStorage.removeItem('authToken');
          navigate('/registration');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?\d[\d\s()-]*$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdatePhone = async () => {
    if (!newPhone.trim()) {
      setNotification({ message: 'Номер телефона не должен быть пустым.', type: 'danger' });
      return;
    }

    if (!validatePhone(newPhone)) {
      setNotification({ message: 'Неверный формат номера телефона.', type: 'danger' });
      return;
    }

    try {
      const response = await fetch('https://pets.сделай.site/api/users/phone', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: newPhone }),
      });

      if (response.ok) {
        setUser({ ...user, phone: newPhone });
        setNotification({ message: 'Номер телефона успешно обновлен!', type: 'success' });
        setEditMode(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Ошибка обновления телефона.');
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail.trim()) {
      setNotification({ message: 'Email не должен быть пустым.', type: 'danger' });
      return;
    }

    if (!validateEmail(newEmail)) {
      setNotification({ message: 'Неверный формат email.', type: 'danger' });
      return;
    }

    try {
      const response = await fetch('https://pets.сделай.site/api/users/email', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (response.ok) {
        setUser({ ...user, email: newEmail });
        setNotification({ message: 'Email успешно обновлен!', type: 'success' });
        setEditMode(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Ошибка обновления email.');
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const calculateRegistrationDays = (registrationDate) => {
    const registrationMoment = moment(registrationDate, 'YYYY-MM-DD');

    const daysDifference = moment().diff(registrationMoment, 'days');

    return daysDifference;
  };

  if (isLoading) {
    return <div className="text-center mt-4">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', marginTop: '250px' }}>
        <span className="visually-hidden">Загрузка...</span>
      </div>
      <p className="mt-3">Загрузка данных...</p>
    </div>
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Ошибка загрузки данных пользователя</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Вернуться на главную</button>
      </div>
    );
  }

  return (
    <div>
      <ProfileContent
        user={user}
        notification={notification}
        editMode={editMode}
        newPhone={newPhone}
        newEmail={newEmail}
        setEditMode={setEditMode}
        handlePhoneChange={(e) => setNewPhone(e.target.value)}
        handleEmailChange={(e) => setNewEmail(e.target.value)}
        handleUpdatePhone={handleUpdatePhone}
        handleUpdateEmail={handleUpdateEmail}
        handleLogout={handleLogout}
        calculateRegistrationDays={calculateRegistrationDays}
      />
      <UserOrders token={token} />
    </div>
  );
};

export default Profile;