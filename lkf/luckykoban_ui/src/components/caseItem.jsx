import { NavLink } from 'react-router-dom';

const CaseItem = (props) => {
  return (
    <div className='case'>
      <div className='case__inner'>
        <div className='case__img-box'>
          <NavLink className='case__img-link'>
            <img src={props.myCase.poster} className='case__img' />
          </NavLink>
        </div>
        <div className='case__content'>
          <div className='case__title-linkbox'>
            <NavLink className='case__title-link'>{props.myCase.name}</NavLink>
          </div>
          <div className='case__price-box'>
            <div className='case__price-last'>{props.myCase.priceLast}</div>
            <div className='case__price-now'>{props.myCase.priceNow}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CaseItem };
