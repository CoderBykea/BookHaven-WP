import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookDetails = ({ books, addReview }) => {
  const { id } = useParams();
  const [reviewText, setReviewText] = useState('');
  const { user } = useContext(AuthContext);
  const book = books.find(b => b.id === id);

  if (!book) return <div>Book not found!</div>;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="book-card p-3 text-center">
            <div
              className="mb-3"
              style={{
                height: '200px',
                backgroundColor: '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i
                className="bi bi-book"
                style={{ fontSize: '4rem', color: 'var(--primary)' }}
              ></i>
            </div>
            <h3>{book.title}</h3>
            <p className="text-muted">by {book.author}</p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="book-card p-4 mb-4">
            <h4>About This Book</h4>
            <p className="text-muted">{book.description || "No description available."}</p>
          </div>

          <div className="book-card p-4">
            <h4 className="mb-3">
              <i className="bi bi-chat-square-text me-2"></i>
              Reviews
            </h4>
            {book.reviews.map((review, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <p>{review.text}</p>
                  <small>By: {review.user}</small>
                </div>
              </div>
            ))}

            {user && (
              <div className="mt-3">
                <textarea
                  className="form-control"
                  placeholder="Write a review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                  onClick={() => {
                    addReview(id, { text: reviewText, user: user.email });
                    setReviewText('');
                  }}
                  className="btn btn-primary mt-2"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
