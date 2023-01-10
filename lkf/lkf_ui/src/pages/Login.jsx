import React, { useState, useForm } from 'react';
import { API_URL } from '../config/config';
import Layout from '../components/Layout';

const Login = () => {
  const [authData, setAuthData] = useState({});

  const [changeTab, setChangeTab] = useState('Логин');

  const authSetData = (e) => {
    e.preventDefault();
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const postAuthReg = async () => {
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
    if (response.status === 200) {
      alert('Регистрация прошла успешно');
    } else {
      alert('Еблан, ты че ввел???');
    }
  };

  const postAuthLogin = async () => {
    let response = await fetch(API_URL + 'user/login', {
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
    if (response.status === 200) {
      alert('Успешный вход');
    } else {
      alert('Ну ты вдвойне еблан');
    }
  };

  return (
    <>
      <Layout title='Lucky Koban | Вход' content='Login page'></Layout>
      <div className='login'>
        <div className='login__changetab-box'>
          <h1
            className={
              'login__title ' +
              (changeTab === 'Логин' ? 'login__changetab--active' : '')
            }
            onClick={() => setChangeTab('Логин')}
          >
            Логин
          </h1>
          <h1
            className={
              'login__title login__register-title ' +
              (changeTab === 'Регистрация' ? 'login__changetab--active' : '')
            }
            onClick={() => setChangeTab('Регистрация')}
          >
            Регистрация
          </h1>
        </div>
        {changeTab === 'Логин' ? (
          <form className='login__box'>
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
            <input
              className='login__btn btn'
              value='Войти'
              type='button'
              onClick={postAuthLogin}
            />
          </form>
        ) : (
          <form className='login__box'>
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
            <input
              className='login__btn btn'
              value='Зарегистрироваться'
              type='button'
              onClick={postAuthReg}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
