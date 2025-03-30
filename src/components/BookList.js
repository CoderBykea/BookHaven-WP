import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookList = ({ books, toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <input
        type="text"
        placeholder="Search books..."
        className="form-control mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredBooks.map(book => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card book-card h-100">
              <div className="card-body d-flex flex-column">
                {/* Book cover placeholder with random gradient */}
                <div className="book-cover mb-3" style={{
                  height: '150px', 
                  background: `linear-gradient(45deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`,
                  borderRadius: '4px'
                }}></div>

                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">{book.author}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <Link to={`/books/${book.id}`} className="btn btn-sm btn-outline-primary">
                    Details
                  </Link>
                  {user && (
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className={`btn btn-sm ${book.isFavorite ? 'btn-warning' : 'btn-outline-secondary'}`}
                    >
                      {book.isFavorite ? '♥ Favorited' : '♥ Favorite'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
