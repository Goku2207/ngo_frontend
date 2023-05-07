import React from "react";
import axios from '../../../axios';

const DonatedItems = (props) => {

    const handlePayment = async (e,itemID) => {
        e.preventDefault();
        const response = await axios.post('/admin/payOff',{_id: itemID, paid:1});
        console.log(response);
        if(response.status == 200){
            props.setUpdateComponent(prevState=>{
                return !prevState;
            })
        }
        else{
            alert(response.message);
        }
    }

    return(
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
                                </tr> 
                            );
                        })
                    }
                    
                </table>
                </div>
    );
}

export default DonatedItems;