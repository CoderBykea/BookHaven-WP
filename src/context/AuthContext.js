import React, { createContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const storedAuth = localStorage.getItem('bookhaven_auth');
    if (storedAuth) {
      const { user, credentials } = JSON.parse(storedAuth);
      setUser(user);
      setCredentials(credentials || []);
    }
  }, []);

  const login = async (email, password) => {
    const userCredential = credentials.find(c => c.email === email);
    let updatedCredentials = [...credentials];

    if (userCredential) {
      // Use bcrypt to compare password with the stored passwordHash
      const isMatch = await bcrypt.compare(password, userCredential.passwordHash);
      if (!isMatch) throw new Error('Incorrect password');
    } else {
      // New user registration
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      updatedCredentials = [...credentials, { email, passwordHash }];
      setCredentials(updatedCredentials);
    }

    const user = { email };
    setUser(user);
    localStorage.setItem('bookhaven_auth', JSON.stringify({
      user,
      credentials: updatedCredentials
    }));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};