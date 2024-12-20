import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="d-flex justify-content-center mt-5">
      <ul className="pagination" style={{ fontSize: '1.1rem' }}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link " onClick={() => handlePageClick(currentPage - 1)}>
            &laquo;
          </button>
        </li>
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
          >
            <button className="page-link " onClick={() => handlePageClick(page)} disabled={page === '...'}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link " onClick={() => handlePageClick(currentPage + 1)}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;