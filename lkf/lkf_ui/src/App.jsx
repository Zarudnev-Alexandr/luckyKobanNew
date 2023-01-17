import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Lk from './pages/Lk';
import './styles/styles.scss';
import { userContext } from './context/context';
import { API_URL } from './config/config';

const App = () => {
  useEffect(() => {
    getMe();
  }, []);

  const [token, setToken] = useState(null);

  const value = useMemo(() => ({ token, setToken }), [token, setToken]);

  const getMe = async () => {
    let response = await fetch(API_URL + 'user/get_me', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setToken(localStorage.getItem('token'));
    } else {
    }
  };

  return (
    <>
      <userContext.Provider value={value}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/lk' element={<Lk />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </>
  );
};

export default App;
