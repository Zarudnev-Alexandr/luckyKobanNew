import React from 'react';
import vk from '../images/vk.svg';
import telegram from '../images/telega.svg';
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer__inner'>
          <div className='footer__links'>
            <ul className='footer__links-list'>
              <li className='footer__links-list__item'>
                <NavLink className='footer__links-list__item-link'>
                  Гарантии
                </NavLink>
              </li>
              <li className='footer__links-list__item'>
                <NavLink className='footer__links-list__item-link'>
                  Отзывы
                </NavLink>
              </li>
              <li className='footer__links-list__item'>
                <NavLink className='footer__links-list__item-link'>
                  Помощь
                </NavLink>
              </li>
              <li className='footer__links-list__item'>
                <NavLink className='footer__links-list__item-link'>
                  Политика безопасности
                </NavLink>
              </li>
              <li className='footer__links-list__item'>
                <NavLink className='footer__links-list__item-link'>
                  Пользовательское соглашение
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='footer__images'>
            <ul className='footer__images-list'>
              <li className='footer__images-list__item'>
                <a
                  className='footer__images-list__item-link'
                  href='https://vk.com/lucky_koban'
                >
                  <img
                    className='footer__images-list__item-img'
                    src={vk}
                    to='https://vk.com/lucky_koban'
                  />
                </a>
              </li>
              <li className='footer__images-list__item'>
                <NavLink className='footer__images-list__item-link'>
                  <img
                    className='footer__images-list__item-img'
                    src={telegram}
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
