import React from 'react';
import BookList from '../components/BookList';

const Home = ({ books, toggleFavorite }) => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ color: 'var(--primary)' }}>
          <i className="bi bi-book me-2"></i>BookHaven
        </h1>
        <p className="lead text-muted">
          Discover your next favorite read
        </p>
      </div>
      <BookList books={books} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default Home;