import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Контакты</h1>
      <p>
        Если у вас есть вопросы или предложения, свяжитесь с нами:
      </p>
      <ul>
        <li>Email: <a href="mailto:info@foundpets.com">info@foundpets.com</a></li>
        <li>Телефон: <a href="tel:+79112223344">+7 (911) 222-33-44</a></li>
        <li>Адрес: ул. Мирная, 1, Санкт-Петербург, Россия</li>
      </ul>
    </div>
  );
};

export default Contact;