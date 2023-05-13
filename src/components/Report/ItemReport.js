import React, { useEffect, useState } from 'react';
import './Report.css';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';
import Spinner from '../Utility/Spinner';

const ItemReport = (props) => {

  const location = useLocation();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const timer = setTimeout(async () => {
            //console.log(location.state);
            try{
                const response = await axios.post('/items/get',{ itemID: location.state.itemID});
                //console.log(response);
                setLoading(false);
                if(response.status == 200){
                    setItem(response.data.product);
                }
            }
            catch(err){
                console.log(err);
            }
        },500);
        return () => {clearTimeout(timer);};
    }, []);

  return (
            <div className='body'>
                { loading && <Spinner/>}
                <div className='b1'>
                    <div className='block'>
                        1. Donor placed the pickup order on : {item.donatedDate}
                    </div>
                </div>
                
                <div className='b1'>
                    <div className='block'>
                        2. This is the image uploaded by donor(initial state) :
                        <br/><br/>
                        {
                            item.url && item.url.map((link)=>{
                                return(
                                    <a href={link} target="_blank"><img src={link} height="200px"/>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='b1'>
                    <div className='block'>
                    3. Agent picked up the item on: {item.pickupDate}
                    </div>
                </div>

                <div className='b1'>
                    <div className='block'>
                        4. This is the image uploaded by agent(final state) :
                        <br/><br/>
                        {
                            item.afterMendUrl && item.afterMendUrl.map((link)=>{
                                return(
                                    <a href={link} target="_blank"><img src={link} height="200px"/>&nbsp;&nbsp;&nbsp;&nbsp;</a>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
  );
}

export default ItemReport;