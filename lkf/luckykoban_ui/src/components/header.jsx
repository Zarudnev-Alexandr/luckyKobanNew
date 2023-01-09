import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Login } from './login';

import logo from '../images/logo.png';
import cart from '../images/cart.svg';
import person from '../images/person.svg';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='header'>
      <div className='container'>
        <div className='header__inner'>
          <div className='header__logo-box'>
            <NavLink className='header__logo-link' to='/'>
              <img className='header__logo' src={logo} />
            </NavLink>
          </div>
          <div className='header__peoplecount-box'>
            <div className='header__peoplecount'>777</div>
          </div>
          {isLogin == true ? (
            <div className='header__links-autorisation__box'>
              <NavLink className='header__link header__links-cart'>
                <img
                  src={cart}
                  className='header__links-img header__links-cart__img'
                />
              </NavLink>
              <NavLink className='header__link header__links-person'>
                <img
                  src={person}
                  className='header__links-img header__links-person__img'
                />
              </NavLink>
            </div>
          ) : (
            <NavLink className='header__login-link' to='/Login'>
              Вход
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export { Header };
