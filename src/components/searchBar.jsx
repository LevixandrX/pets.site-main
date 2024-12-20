import React from 'react';

const SearchBar = ({ district, setDistrict, kind, setKind, onSearch, onClear, loading }) => {
  return (
    <div className="row mb-4 mt-5 justify-content-center">
      <div className="col-12 col-md-5 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите район"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-5 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Введите вид животного"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary px-4"
          onClick={onSearch}
          disabled={loading || (!district && !kind)}
          style={{ borderRadius: '10px', fontWeight: 'bold' }}
        >
          Поиск
        </button>
        <button
          className="btn btn-outline-secondary px-4"
          onClick={onClear}
          disabled={loading}
          style={{ borderRadius: '10px', fontWeight: 'bold' }}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default SearchBar;