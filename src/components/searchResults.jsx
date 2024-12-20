import React from 'react';
import AnimalCard from './animalCard1';

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div
            className="alert alert-warning text-center animate__animated animate__fadeIn"
            style={{
              maxWidth: '500px',
              borderRadius: '15px',
              padding: '30px',
              background: 'linear-gradient(135deg,rgb(240, 160, 40) 0%,rgb(236, 24, 24) 100%)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              animation: 'fadeIn 1s ease-out',
            }}
            role="alert"
          >
            <h4 className="alert-heading" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
              Нет объявлений для этого поиска
            </h4>
            <p style={{ fontSize: '1rem', color: '#fff' }}>
              Попробуйте изменить фильтры поиска или попробуйте позже.
            </p>
          </div>
        </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {results.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};

export default SearchResults;