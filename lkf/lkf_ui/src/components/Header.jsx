import Logo from '../images/logo.png';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../context/context';

const Header = () => {
  const { token, setToken } = useContext(userContext);

  return (
    <>
      <div className='header'>
        <div className='container'>
          <div className='header__inner'>
            <div className='header__logo-box'>
              <NavLink className='header__logo-box__link' to='/'>
                <img src={Logo} alt='logo' className='header__logo-img' />
              </NavLink>
            </div>
            <div className='header__links-box'>
              <ul className='header__links-list'>
                <li className='header__links-list__item'>
                  <a href='#1' className='header__links-list__item-link'>
                    Популярное
                  </a>
                </li>
                <li className='header__links-list__item'>
                  <a href='#2' className='header__links-list__item-link'>
                    Акция
                  </a>
                </li>
                <li className='header__links-list__item'>
                  <a href='#3' className='header__links-list__item-link'>
                    Осталось мало
                  </a>
                </li>
              </ul>
            </div>
            <div className='header__auth-box'>
              {token ? (
                <>
                  <NavLink className='header__auth-link' to='/lk'>
                    Личный кабинет
                  </NavLink>
                  <NavLink
                    className='header__auth-link'
                    onClick={() => (
                      setToken(null), localStorage.setItem('token', null)
                    )}
                  >
                    Выход
                  </NavLink>
                </>
              ) : (
                <NavLink to='/login' className='header__auth-link'>
                  Вход
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
