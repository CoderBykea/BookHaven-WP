import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author, description: "" }); // Pass the new book to App.js
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="book-card p-4">
            <h2 className="text-center mb-4">
              <i className="bi bi-plus-circle me-2"></i>
              Add New Book
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
