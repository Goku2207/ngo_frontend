import React, { useState } from "react";
import axios from '../../../axios';
import Spinner from "../../Utility/Spinner";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';

const DonatedItems = (props) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e,itemID) => {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post('/admin/payOff',{_id: itemID, paid:1});
        console.log(response);
        setLoading(false);
        if(response.status == 200){
            props.setUpdateComponent(prevState=>{
                return !prevState;
            })
        }
        else{
            alert(response.message);
        }
    }

    const handleReport = (e, itemID) => {
        e.preventDefault();
        navigate("/itemReport",{state:{itemID}});
    }

    return(
        <>
        {loading && <Spinner/>}
        <div class="recent-payments">
                <div class="title">
                    <h2>Donation Item Status</h2>
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Category</th>
                        <th>Agent</th>
                        <th>Status</th>
                    </tr>
                    {
                        props.donatedItems.map((item)=>{
                            return(
                                <tr key={item._id}>
                                    <td><img src={item.url[0]} height="100px" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.region}</td>
                                    <td>{item.category}</td>
                                    <td>{item.collectorName}</td>
                                    <td>
                                        {item.status=='Delivered'&&
                                            <a href="#" class="btn" onClick={(e)=>handlePayment(e,item._id)}>Pay</a>}
                                        {!(item.status=='Delivered')&&
                                            <a href="#" class="btn">{item.status}</a>}
                                    </td>
                                    <td>
                                        <a href="#" class="btn" onClick={(e)=>handleReport(e,item._id)}>Report</a>
                                    </td>
                                </tr> 
                            );
                        })
                    }
                    
                </table>
                </div>
                </>
    );
}

export default DonatedItems;