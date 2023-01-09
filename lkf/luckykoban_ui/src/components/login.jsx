import { Header } from './header';
import { Footer } from './footer';
import React, { useState, useForm } from 'react';

function Login() {
  const [sendRegister, setSendRegister] = useState(false);
  const [sendLogin, setSendLogin] = useState(false);

  const [authorizationData, setAuthorizationData] = useState({
    login: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    login: '',
    password: '',
  });

  const authorizationSetData = (e) => {
    setAuthorizationData({
      ...authorizationData,
      [e.target.name]: e.target.value,
    });
  };

  const registerSetData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitRegister = async (e) => {
    setSendRegister(true);
    let response = await fetch('https://lucky-koban.ru/api/user/reg', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    let data = await response.json();

    if (response.status === 200) {
      alert(data.res);
      setTimeout(reset, 3000);
    } else {
      alert('Произошла ошибка');
    }
  };

  const onClickLogin = () => {
    const login = authorizationData.login;
    const password = authorizationData.password;
    reset();
  };

  const { handleSubmit, reset } = useForm({ mode: 'onBlur' });

  const [isLogin, setIsLogin] = useState(true);

  const [loginLogin, setLoginLogin] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const [registerLogin, setRegisterLogin] = useState();
  const [registerPassword, setRegisterPassword] = useState();

  const switchLogin = () => {
    setIsLogin(!isLogin);
    setLoginLogin('');
    setLoginPassword('');
    setRegisterLogin('');
    setRegisterPassword('');
  };

  return (
    <>
      <Header />
      <section className='login'>
        <div className='container'>
          <div className='login__inner'>
            <div className='login__switch-box'>
              <h3
                className={
                  'login__title login__title-login ' +
                  (isLogin ? 'login__title--active' : '')
                }
                onClick={isLogin ? '' : switchLogin}
              >
                Вход
              </h3>
              <h3
                className={
                  'login__title login__title-register ' +
                  (isLogin ? '' : 'login__title--active')
                }
                onClick={isLogin ? switchLogin : ''}
              >
                Регистрация
              </h3>
            </div>
            {isLogin ? (
              <form
                className='login__content login__content-login'
                onSubmit={handleSubmit(onClickLogin)}
              >
                <div className='login__content-input__box login__content-input__login-box'>
                  <input
                    type='text'
                    className='login__content-input__login'
                    placeholder='Введите логин'
                    value={loginLogin}
                    name='login'
                    onChange={(event) => authorizationSetData(event)}
                    required
                  />
                </div>
                <div className='login__content-input__box login__content-input__password-box'>
                  <input
                    type='password'
                    className='login__content-input__password'
                    placeholder='Введите пароль'
                    name='password'
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event)}
                    required
                  />
                </div>
                <button className='login__btn login__btn-login' type='submit'>
                  Вход
                </button>
              </form>
            ) : (
              <form
                className='login__content login__content-register'
                onSubmit={handleSubmit(onSubmitRegister)}
              >
                <div className='login__content-input__box login__content-input__register-box'>
                  <input
                    type='text'
                    className='login__content-input__register'
                    placeholder='Введите логин'
                    value={registerLogin}
                    name='login'
                    onChange={(event) => registerSetData(event)}
                    required
                  />
                </div>
                <div className='login__content-input__box login__content-input__password-box'>
                  <input
                    type='password'
                    className='login__content-input__password'
                    placeholder='Введите пароль'
                    value={registerPassword}
                    name='password'
                    onChange={(event) => registerSetData(event)}
                    required
                  />
                </div>
                <button className='login__btn login__btn-login' type='submit'>
                  Регистрация
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export { Login };
