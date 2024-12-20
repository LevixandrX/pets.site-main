import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/searchBar';
import SearchResults from '../components/searchResults';
import Pagination from '../components/pagination';

const Search = () => {
  const [district, setDistrict] = useState('');
  const [kind, setKind] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allAnimals, setAllAnimals] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pets.сделай.site/api/search`);
      const data = await response.json();
      if (data.data?.orders) {
        const sortedAnimals = [...data.data.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllAnimals(sortedAnimals);
        setResults(sortedAnimals.slice(0, 6));
        setTotalPages(Math.ceil(sortedAnimals.length / 6));
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const handleSearch = () => {
    const filteredOrders = allAnimals.filter((order) => {
      const matchesDistrict = district ? order.district.toLowerCase() === district.toLowerCase() : true;
      const matchesKind = kind ? order.kind.toLowerCase().includes(kind.toLowerCase()) : true;
      return matchesDistrict && matchesKind;
    });
    setResults(filteredOrders.slice(0, 6));
    setTotalPages(Math.ceil(filteredOrders.length / 6));
    setPage(1);
  };

  const clearFilters = () => {
    setDistrict('');
    setKind('');
    setResults(allAnimals.slice(0, 6));
    setTotalPages(Math.ceil(allAnimals.length / 6));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const startIndex = (newPage - 1) * 6;
    const endIndex = startIndex + 6;
    setResults(allAnimals.slice(startIndex, endIndex));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Поиск по объявлениям</h2>
      <SearchBar
        district={district}
        setDistrict={setDistrict}
        kind={kind}
        setKind={setKind}
        onSearch={handleSearch}
        onClear={clearFilters}
        loading={loading}
      />
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem', marginTop: '130px'}}>
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-3">Загрузка данных...</p>
        </div>
      ) : (
        <>
          <SearchResults results={results} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Search;