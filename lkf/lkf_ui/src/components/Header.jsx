import Logo from '../images/logo.png';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='container'>
          <div className='header__inner'>
            <div className='header__logo-box'>
              <a className='header__logo-box__link' href='/'>
                <img src={Logo} alt='logo' className='header__logo-img' />
              </a>
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
              <a href='/login' className='header__auth-link'>
                Вход
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;