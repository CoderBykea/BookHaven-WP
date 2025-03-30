import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: '1', title: 'Horus Rising', author: 'Dan Abnett', description: 'A wonderful introduction into the grim-dark future of the 31st millenium', isFavorite: false, reviews: [] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, id: Date.now().toString(), isFavorite: false, reviews: [] }]);
  };

  const toggleFavorite = (id) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  };

  const addReview = (id, review) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, reviews: [...book.reviews, review] } : book
    ));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home books={books} toggleFavorite={toggleFavorite} />} />
        <Route path="/add" element={<AddBook addBook={addBook} />} />
        <Route path="/favorites" element={<Favorites books={books} toggleFavorite={toggleFavorite} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books/:id" element={<BookDetails books={books} addReview={addReview} />} />
      </Routes>
    </div>
  );
}

export default App;