import React, { useState, useEffect } from 'react';
import AnimalCard from './animalCard1';
import Spinner from 'react-bootstrap/Spinner';

const Cards = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('https://pets.сделай.site/api/pets');
        const data = await response.json();
        setAnimals(data.data.orders || []);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (animals.length === 0) {
    return (
      <div className="container py-4">
        <p className="text-center text-muted">Нет доступных объявлений</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center text-white bg-primary m-3">
        Карточки найденных животных
      </h2>

      <div className="container py-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;