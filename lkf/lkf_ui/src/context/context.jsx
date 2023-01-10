import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';

const AuthContext = createContext();

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

  let [loading, setLoading] = useState(true);

  // let LoginUser = async (name, password) => {
  //   let response = await fetch(API_URL)
  // };
};
