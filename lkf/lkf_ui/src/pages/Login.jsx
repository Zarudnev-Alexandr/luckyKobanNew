import React, { useState, useContext, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { API_URL } from '../config/config';
import Layout from '../components/Layout';
import { userContext } from '../context/context';
const Login = () => {
  //let { LoginUser } = useContext(AuthContext);
  const [authData, setAuthData] = useState({});

  const [changeTab, setChangeTab] = useState('Логин');

  const { handleSubmit, reset } = useForm({ mode: 'onblur' });

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
      alert('Читать умеешь, ммм?');
    }
  };

  const postAuthLogin = async () => {
    let response = await fetch(API_URL + 'user/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //credentials: 'include',
      body: JSON.stringify({
        ...authData,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      alert('Успешный вход');
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } else {
      alert('Вышел и зашел обратно');
    }
  };

  const { token, setToken } = useContext(userContext);

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
