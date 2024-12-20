import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

const QuickSearch = ({ host, handleNavbarCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(`${host}/api/search?query=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.data.orders || []);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = debounce((query) => fetchSuggestions(query), 500);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSuggestionClick = (animal) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(`/search/animal/${animal.id}`, { state: { animal } });
    if (handleNavbarCollapse) handleNavbarCollapse();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchQuery('');
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="position-relative" ref={searchContainerRef}>
      {/* Поле поиска */}
      <div className="input-group">
        <span className="input-group-text bg-white">
          <FaSearch className="text-muted" />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Поиск по описанию"
          value={searchQuery}
          onChange={handleChange}
          style={{ width: '250px' }}
        />

      </div>

      {/* Прелоадер */}
      {loading && (
        <div
          className="position-absolute bg-light text-center text-primary py-2 px-3 shadow rounded"
          style={{
            width: '100%',
            marginTop: '5px',
            zIndex: 10,
          }}
        >
          <span className="spinner-border spinner-border-sm me-2"></span>
          Загрузка...
        </div>
      )}

      {/* Список подсказок */}
      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute shadow rounded"
          style={{
            width: '100%',
            marginTop: '5px',
            zIndex: 10,
            maxHeight: '300px',
            overflowY: 'auto',  // Вертикальный скролл
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              <span className="text-truncate">{suggestion.description}</span>
              <FaArrowRight className="text-primary" />
            </li>
          ))}
        </ul>
      )}

      {/* Пустой результат */}
      {searchQuery.length > 2 && !loading && suggestions.length === 0 && (
        <div
          className="position-absolute bg-light text-muted text-center py-2 px-3 shadow rounded"
          style={{
            width: '100%',
            marginTop: '5px',
            zIndex: 10,
          }}
        >
          Результаты не найдены
        </div>
      )}
    </div>
  );
};

export default QuickSearch;