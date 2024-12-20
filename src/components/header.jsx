import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import QuickSearch from './quickSearch';
import LoginModal from './loginModal';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleNavbarCollapse = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light py-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center fs-4">
            <img
              src={logo}
              className="logo-img me-2 rounded-3"
              alt="Логотип GET PET BACK"
              style={{ height: '40px', width: 'auto' }}
            />
            <span className="text-dark">GET PET BACK</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active px-2 py-1" onClick={handleNavbarCollapse}>
                  Главная
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-order" className="nav-link px-2 py-1" onClick={handleNavbarCollapse}>
                  Добавить объявление
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link px-2 py-1" onClick={handleNavbarCollapse}>
                  Поиск по объявлениям
                </Link>
              </li>
            </ul>

            <QuickSearch host="https://pets.сделай.site" handleNavbarCollapse={handleNavbarCollapse} />

            {/* Кнопки для авторизованных и неавторизованных пользователей */}
            <div className="d-flex align-items-center">
              <div className="d-none d-lg-flex align-items-center ms-2">
                {token ? (
                  <>
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => {
                        navigate('/profile');
                      }}
                    >
                      Личный кабинет
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Войти
                    </button>
                    <Link
                      to="/registration"
                      className="btn btn-danger w-100"
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>

              {/* Для мобильных экранов, кнопки центрированы и одинакового размера */}
              <div className="d-lg-none d-flex flex-column align-items-center mt-2 w-100">
                {token ? (
                  <>
                    <button
                      className="btn btn-outline-primary mb-2 w-100"
                      onClick={() => {
                        navigate('/profile');
                        handleNavbarCollapse();
                      }}
                    >
                      Личный кабинет
                    </button>
                    <button
                      className="btn btn-outline-danger mb-2 w-100"
                      onClick={() => {
                        handleLogout();
                        handleNavbarCollapse();
                      }}
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary mb-2 w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      onClick={handleNavbarCollapse}
                    >
                      Войти
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        handleNavbarCollapse();
                        navigate('/registration');
                      }}
                    >
                      Регистрация
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

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
    </>
  );
};

export default Header;