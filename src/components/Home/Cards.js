import React, { useState, useEffect } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from '../../axios';

const Cards = () => {

  const [topThree, setTopThree] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
            try{
                const response = await axios.get('/donator/topThree');
                //console.log(response);
                if(response.status == 200){
                    setTopThree(response.data.topThree);
                }
            }
            catch(err){
                console.log(err);
            }
        },500);
        return () => {clearTimeout(timer);};
    }, []);

  return (
    <div className='cards'>
      <h1>Top Contributors!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {
                topThree.map((donor)=>{
                  const text = donor.name + ' - No. of donations : ' + donor.cnt;
                  
                  return(
                    <CardItem
                      text={text}
                      label='Donor'
                      path='/sign-up'
                    />
                  );
                })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
