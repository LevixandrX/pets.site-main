import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const UserInfo = ({
    user,
    setEditMode,
    handlePhoneChange,
    handleEmailChange,
    calculateRegistrationDays,
    handleLogout,
}) => {
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-10 col-lg-8">
                <div className="card shadow-lg border-light rounded-3">
                    <div className="card-body p-4">
                        <h5 className="card-title text-center mb-3 text-uppercase fw-bold text-primary">
                            Информация о пользователе
                        </h5>

                        <hr className="my-3" style={{ borderTop: '2px solid #0056b3' }} />

                        <div className="mb-4">
                            <p className="mb-1 fs-5"><strong>Имя пользователя:</strong> {user.name}</p>
                            <p className="text-muted">Приветствуем вас в системе!</p>
                        </div>

                        <div className="mb-4">
                            <p className="mb-1 fs-5"><strong>Дата регистрации:</strong> {user.registrationDate}</p>
                            <p className="text-muted">Вы с нами уже {calculateRegistrationDays(user.registrationDate)} дней!</p>
                        </div>

                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <FaPhoneAlt className="text-muted me-2" />
                                <p className="m-0 fs-5"><strong>Номер телефона:</strong></p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="m-0">{user.phone}</p>
                                <Button
                                    variant="link"
                                    className="text-primary ms-2 p-0"
                                    onClick={() => {
                                        setEditMode('phone');
                                        handlePhoneChange({ target: { value: user.phone } });
                                    }}
                                    title="Редактировать телефон"
                                    style={{ transition: 'color 0.3s ease', ':hover': { color: '#0056b3' } }}
                                >
                                    <FaEdit />
                                </Button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                                <FaEnvelope className="text-muted me-2" />
                                <p className="m-0 fs-5"><strong>Email:</strong></p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="m-0">{user.email}</p>
                                <Button
                                    variant="link"
                                    className="text-primary ms-2 p-0"
                                    onClick={() => {
                                        setEditMode('email');
                                        handleEmailChange({ target: { value: user.email } });
                                    }}
                                    title="Редактировать email"
                                    style={{ transition: 'color 0.3s ease', ':hover': { color: '#0056b3' } }}
                                >
                                    <FaEdit />
                                </Button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="fs-5 mb-1"><strong>Количество объявлений:</strong> {user.countOrder || 0}</p>
                            <p className="fs-5"><strong>Количество найденных животных:</strong> {user.countPets || 0}</p>
                        </div>
                        <div className="text-center mt-4">
                            <Button variant="danger" onClick={handleLogout} className="px-4 py-2 rounded-3 shadow-sm">
                                Выйти из аккаунта
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;