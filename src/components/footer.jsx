import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-5 mt-5">
            <div className="container">
                <div className="row text-center text-md-start">
                    <div className="col-12 col-md-4 mb-4">
                        <h5 className="fw-bold text-uppercase">О проекте</h5>
                        <p className="small">
                            GET PET BACK — это платформа для поиска пропавших домашних животных. Мы помогаем владельцам и волонтерам
                            в поисках домашних питомцев и возвращении их домой.
                        </p>
                    </div>

                    <div className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                        <div>
                            <h5 className="fw-bold text-uppercase text-center">Ссылки</h5>
                            <ul className="list-unstyled text-center">
                                <li className="mb-2">
                                    <Link to="/" className="text-white text-decoration-none hover-link">
                                        Главная
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/about" className="text-white text-decoration-none hover-link">
                                        О нас
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/contact" className="text-white text-decoration-none hover-link">
                                        Контакты
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/privacy" className="text-white text-decoration-none hover-link">
                                        Политика конфиденциальности
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-4 d-md-flex justify-content-md-end">
                        <div>
                            <h5 className="fw-bold text-uppercase">Свяжитесь с нами</h5>
                            <p className="small text-md-end mb-2">
                                <i className="bi bi-envelope"></i> support@getpetback.ru
                            </p>
                            <p className="small text-md-end mb-2">
                                <i className="bi bi-telephone"></i> +7 (952) 812-45-67
                            </p>
                            <div className="d-flex justify-content-center justify-content-md-end">
                                <a href="https://t.me" className="btn btn-outline-light btn-sm me-2" aria-label="Telegram">
                                    <i className="bi bi-telegram"></i>
                                </a>
                                <a href="https://www.youtube.com" className="btn btn-outline-light btn-sm me-2" aria-label="YouTube">
                                    <i className="bi bi-youtube"></i>
                                </a>
                                <a href="https://www.instagram.com" className="btn btn-outline-light btn-sm" aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="bg-light" />

                <div className="text-center small">
                    <p>&copy; 2024 GET PET BACK. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;