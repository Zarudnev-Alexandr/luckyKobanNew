import React, { useState, useForm } from 'react';
import { API_URL } from '../config/config';
import Layout from '../components/Layout';

const Login = () => {
  const [authData, setAuthData] = useState({});

  const authSetData = (e) => {
    e.preventDefault();
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const postAuth = async () => {
    let response = await fetch(API_URL + 'user/reg', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...authData,
      }),
    });
    let data = await response.json();
    if (response.status === 201) {
      alert('Топчик');
    } else {
      alert('Не 201(');
    }
  };

  const getMe = async () => {
    let response = await fetch(API_URL + 'user/get_me', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    let data = await response.json();
    if (response.status === 200) {
      alert('vse ok');
    }
  };

  return (
    <>
      <Layout title='Lucky Koban | Вход' content='Login page'></Layout>
      <div className='login'>
        <form className='login__box' onSubmit={postAuth}>
          <h1 className='login__title'>Логин</h1>
          <input
            className='login__email'
            type='email'
            name='email'
            placeholder='Введите почту'
            onChange={(e) => authSetData(e)}
          />
          <input
            className='login__password'
            type='password'
            name='password'
            placeholder='Введите пароль'
            onChange={(e) => authSetData(e)}
          />
          <button className='login__btn btn' type='submit'>
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
