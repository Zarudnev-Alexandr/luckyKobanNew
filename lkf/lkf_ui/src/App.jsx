import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import Login from './pages/Login';
import './styles/styles.scss';
import { UserContext } from './context/context';
import { useState, useMemo } from 'react';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
