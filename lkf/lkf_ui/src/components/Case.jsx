import React from 'react';

const Case = (props) => {
  return (
    <button className='case btn'>
      <div className='case__inner'>
        <div className='case__img-box'>
          <img className='case_img' src={props.img} alt='case image' />
        </div>
        <div className='case__content-box'>
          <h3 className='case__content-title'>{props.title}</h3>
          <div className='case__content-price__box'>
            <div className='case__content-oldprice'>{props.old_price}</div>
            <div className='case__content-price'>{props.price}</div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Case;
