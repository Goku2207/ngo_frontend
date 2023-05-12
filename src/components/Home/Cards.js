import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Top Contributors!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {/* <ul className='cards__items'>
            <CardItem
              src=''
              text='Mr. Singh - No. of donations : 90'
              label='Donor1'
              path='/sign-up'
            />
            <CardItem
              src=''
              text='Mrs. Sharma - No. of donations : 70'
              label='Donor2'
              path='/sign-up'
            />
          </ul> */}
          <ul className='cards__items'>
            <CardItem
              src=''
              text='Mr. Kumar - No. of donations : 50'
              label='Donor3'
              path='/sign-up'
            />
            <CardItem
              src=''
              text='Mr. Tripathi - No. of donations : 40'
              label='Donor4'
              path='/sign-up'
            />
            <CardItem
              src=''
              text='Mrs. Prasad - No. of donations : 30'
              label='Donor5'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
