import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

// export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  let [user, setUser] = useState(
    //Берем из локального хранилища токен. Если находим его - используем.
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  );
  let [authTokens, setAuthTokens] = useState(
    //Парсим сам токен, если находим
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('aithTokens'))
      : null
  );

  let LoginUser = async (email, password) => {
    let response = await fetch(API_URL + 'user/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      alert('Успешный вход');
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate(localStorage.getItem('last_page'), { replace: true });
    } else {
      alert('Вышел и зашел обратно');
    }
    alert(data);
    alert(response);
  };

  let LogoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    LoginUser: LoginUser,
    LogoutUser: LogoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
