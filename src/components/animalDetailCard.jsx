import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AnimalDetailCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const BASE_URL = "https://pets.сделай.site";

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/pets/${id}`);
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

        const data = await response.json();
        setAnimal(data.data.pet || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-3">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="container text-center py-5">
        <h2 className="text-danger">{error || "Животное не найдено"}</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  const photos = [animal.photos1, animal.photos2, animal.photos3].filter(Boolean);
  const placeholder = "https://via.placeholder.com/800x400?text=No+Image";

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Подробности объявления</h2>
      {/* Анимация появления карточки */}
      <motion.div
        className="card shadow-lg rounded-4 p-4"
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Row className="g-4">
          {/* Блок с изображениями */}
          <Col md={5} className="text-center">
            <div
              style={{
                height: "350px",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                marginBottom: "1rem",
              }}
            >
              <img
                src={photos[activePhotoIndex] ? `${BASE_URL}${photos[activePhotoIndex]}` : placeholder}
                alt="Животное"
                className="img-fluid"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    width: "70px",
                    height: "70px",
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "10px",
                    border: index === activePhotoIndex ? "2px solid #0d6efd" : "none",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s ease",
                  }}
                  onClick={() => setActivePhotoIndex(index)}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <img
                    src={`${BASE_URL}${photo}`}
                    alt={`Фото ${index + 1}`}
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </Col>

          {/* Блок с информацией о животном */}
          <Col md={7}>
            <h2 className="text-primary mb-3" style={{ fontWeight: "700" }}>
              {animal.kind || "Неизвестное животное"}
            </h2>
            <p className="text-muted">
              <strong>Описание:</strong> {animal.description || "Описание отсутствует."}
            </p>
            <ul className="list-unstyled">
              <li>
              <li>
                <strong>Клеймо:</strong> {animal.mark || "Отсутствует"}
              </li>
                <FaMapMarkerAlt className="me-2" />
                <strong>Район:</strong> {animal.district || "Не указан"}
              </li>
              <li>
                <FaCalendarAlt className="me-2" />
                <strong>Дата находки:</strong>{" "}
                {new Date(animal.date).toLocaleString("ru-RU") || "Не указана"}
              </li>
            </ul>

            {/* Контакты */}
            <h5 className="mt-4">Контакты</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Имя:</strong> {animal.name || "Не указано"}
              </li>
              <li>
                <FaEnvelope className="me-2" />
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${animal.email}`}
                  className="text-primary text-decoration-none"
                >
                  {animal.email || "Не указан"}
                </a>
              </li>
              <li>
                <FaPhoneAlt className="me-2" />
                <strong>Телефон:</strong>{" "}
                <a
                  href={`tel:${animal.phone}`}
                  className="text-primary text-decoration-none"
                >
                  {animal.phone || "Не указан"}
                </a>
              </li>
            </ul>
            
            <button
              className="btn btn-secondary mt-3"
              style={{
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className="me-2" />
              Назад
            </button>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default AnimalDetailCard;