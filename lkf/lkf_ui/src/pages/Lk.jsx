import Layout from '../components/Layout';
import React, { useContext, useState, useEffect } from 'react';
import { userContext } from '../context/context';
import { API_URL } from '../config/config';

const Lk = () => {
  useEffect(() => {
    getMe();
  }, []);

  const { token } = useContext(userContext);

  const [email, setEmail] = useState('');
  const [activate, setActivate] = useState();
  const [casesCount, setCasesCount] = useState();
  const [isActiveBtn, setIsActiveBtn] = useState();
  const [rememberBtn, setRememberBtn] = useState();
  const [code, setCode] = useState('');

  const getMe = async () => {
    if (token) {
      let response = await fetch(API_URL + 'user/get_me', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: token,
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        setEmail(data.email);
        setActivate(data.is_activate);
        setCasesCount(data.cases_count);
        if (data.is_activate) {
          setIsActiveBtn(false);
        } else {
          setIsActiveBtn(true);
        }
      } else {
      }
    } else {
    }
  };

  const sendCode = async () => {
    let response = await fetch(API_URL + 'user/send_code', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    if (response.status === 200) {
      alert('Код отправлен, проверьте почту');
    } else {
      alert('Не удалось отправить код');
    }
  };

  const postActivate = async () => {
    let response = await fetch(API_URL + 'user/activate', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        //authorization: localStorage.getItem('token'),
        authorization: token,
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      alert('Успешная отправка');
    } else {
      alert('код дурной');
    }
  };

  return (
    <>
      <Layout
        title='Lucky Koban | Личный кабинет'
        content='personal areae'
      ></Layout>
      <div className='lk'>
        <div className='container'>
          {token ? (
            <div className='lk__content-box'>
              <div className='lk__info-box'>
                <h3 className='lk__info-title'>Общая информация</h3>
                <table className='lk__info-table'>
                  <tbody>
                    <tr>
                      <td>email:</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>Активация аккаунта:</td>
                      <td>
                        {activate ? (
                          <span className='lk__info-table__span-active'>
                            Подтвержден
                          </span>
                        ) : (
                          <span className='lk__info-table__span-disactive'>
                            Не подтвержден
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Куплено кейсов:</td>
                      <td>{casesCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {activate ? (
                ''
              ) : (
                <div className='lk__activatecode-box'>
                  <h3 className='lk__activatecode-title'>Активация кода</h3>

                  {isActiveBtn ? (
                    <>
                      <input
                        className='lk__activatecode-button btn'
                        type='button'
                        value='Помню код'
                        onClick={() => (
                          setRememberBtn(true), setIsActiveBtn(false)
                        )}
                      />
                      <input
                        className='lk__activatecode-button btn'
                        type='button'
                        value='Отправить код'
                        onClick={() => (setIsActiveBtn(false), sendCode())}
                      />
                    </>
                  ) : (
                    <form className='lk__activatecode-form'>
                      <input
                        className='lk__activatecode-input login__email'
                        type='text'
                        placeholder='Введите код'
                        name='code'
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <input
                        className='lk__activatecode-button btn'
                        type='submit'
                        value='Ввести'
                        onClick={() => postActivate()}
                      />
                    </form>
                  )}
                </div>
              )}
            </div>
          ) : (
            'Учетные данные не были предоставлены. Хотите войти в аккаунт?'
          )}
        </div>
      </div>
    </>
  );
};

export default Lk;
