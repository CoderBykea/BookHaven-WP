import React from "react";
import BookList from "../components/BookList";

const Favorites = ({ books, toggleFavorite }) => {
  const favoriteBooks = books.filter(book => book.isFavorite);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold" style={{ color: 'var(--accent)' }}>
          <i className="bi bi-heart-fill me-2"></i>
          Your Favorite Books
        </h2>
        <p className="lead text-muted">
          {favoriteBooks.length} saved {favoriteBooks.length === 1 ? 'book' : 'books'}
        </p>
      </div>
      
      {favoriteBooks.length > 0 ? (
        <BookList books={favoriteBooks} toggleFavorite={toggleFavorite} />
      ) : (
        <p className="text-center text-muted">No favorites yet. Click ♥ on books to save them!</p>
      )}
    </div>
  );
};

export default Favorites;
