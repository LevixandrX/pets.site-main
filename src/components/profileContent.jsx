import React, { useState } from 'react';
import Notification from './notification';
import UserInfo from './userInfo';
import EditPhoneModal from './editPhoneModal';
import EditEmailModal from './editEmailModal';

const ProfileContent = ({
  user,
  notification,
  editMode,
  newPhone,
  newEmail,
  calculateRegistrationDays,
  handlePhoneChange,
  handleEmailChange,
  handleUpdatePhone,
  handleUpdateEmail,
  handleLogout,
  setEditMode,
}) => {
  const [phoneErrors, setPhoneErrors] = useState('');
  const [emailErrors, setEmailErrors] = useState('');

  const validatePhone = (phone) => /^\+?\d{10,15}$/.test(phone);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handlePhoneBlur = () => {
    if (!validatePhone(newPhone)) {
      setPhoneErrors('Некорректный номер телефона');
    } else {
      setPhoneErrors('');
    }
  };

  const handleEmailBlur = () => {
    if (!validateEmail(newEmail)) {
      setEmailErrors('Некорректный email');
    } else {
      setEmailErrors('');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Личный кабинет</h1>

      <Notification notification={notification} />

      <UserInfo
        user={user}
        setEditMode={setEditMode}
        handlePhoneChange={handlePhoneChange}
        handleEmailChange={handleEmailChange}
        calculateRegistrationDays={calculateRegistrationDays}
        handleLogout={handleLogout}
      />

      <EditPhoneModal
        editMode={editMode}
        newPhone={newPhone}
        phoneErrors={phoneErrors}
        handlePhoneChange={handlePhoneChange}
        handlePhoneBlur={handlePhoneBlur}
        handleUpdatePhone={handleUpdatePhone}
        setEditMode={setEditMode}
        user={user}
      />
      
      <EditEmailModal
        editMode={editMode}
        newEmail={newEmail}
        emailErrors={emailErrors}
        handleEmailChange={handleEmailChange}
        handleEmailBlur={handleEmailBlur}
        handleUpdateEmail={handleUpdateEmail}
        setEditMode={setEditMode}
        user={user}
      />
    </div>
  );
};

export default ProfileContent;