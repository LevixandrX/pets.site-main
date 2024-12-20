import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await fetch('https://pets.сделай.site/api/pets/slider');
      const data = await response.json();
      setSliderData(data.data.pets || []);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '40vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (sliderData.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-3">Найденные животные</h2>
      <div
        id="carouselExampleCaptions"
        className="carousel slide mx-auto w-75 w-md-40 p-0 mb-4"
        data-bs-ride="carousel"
        style={{
          backgroundColor: 'black',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div className="carousel-indicators">
          {sliderData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {sliderData.map((pet, index) => (
            <div
              key={pet.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={`https://pets.сделай.site/${pet.image}`}
                className="d-block w-100"
                alt={pet.title}
                style={{
                  height: '60vh',
                  objectFit: 'contain',
                }}
              />
              <div
                className="carousel-caption d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-50 rounded"
                style={{
                  maxWidth: '500px',
                  padding: '1rem',
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                <p className="text-light" style={{ fontSize: '1rem' }}>
                  {pet.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Следующий</span>
        </button>

        <style>
          {`
            @media (max-width: 768px) {
              .carousel-inner img {
                height: 40vh !important;
              }

              .carousel-caption {
                padding: 0.5rem !important;
              }

              .carousel-caption h2 {
                font-size: 1.25rem !important;
              }

              .carousel-caption p {
                font-size: 0.875rem !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Slider;