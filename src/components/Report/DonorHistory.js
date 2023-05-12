import React, { useEffect, useState } from 'react';
import './Report.css';
import { useLocation } from 'react-router-dom';
import axios from '../../axios';
import Spinner from '../Utility/Spinner';

const DonorHistory = (props) => {

  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const timer = setTimeout(async () => {
            //console.log(location.state);
            try{
                if(location.state.type == 'donor'){
                    const response = await axios.post('/donator/items',{ donatorID: location.state.id});
                    console.log(response);
                    setLoading(false);
                    if(response.status == 200){
                        setItems(response.data.donatedItems);
                    }
                }
                else if(location.state.type == 'agent'){
                    const response = await axios.post('/collector/assignedItems',{ collectorID: location.state.id});
                    console.log(response);
                    setLoading(false);
                    if(response.status == 200){
                        setItems(response.data.assignedItems);
                    }
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
                        <b>Name:</b> {location.state.name}<br/>
                        <b>Email:</b> {location.state.email}<br/>
                    </div>
                </div>

                <div className='b1'>
                    <div className='block'>
                        <table>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Region</th>
                                <th>Category</th>
                                <th>Status</th>
                            </tr>
                            {
                                items.map((item)=>{
                                    return(
                                        <tr>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src={item.url[0]} height="100px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>{item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td>{item.region}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td>{item.category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    );
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
  );
}

export default DonorHistory;