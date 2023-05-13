import React from 'react';
import './AgentDashboard.css';
import { useNavigate } from 'react-router-dom';

const UndeliveredItems = (props) => {

    const navigate = useNavigate();

    const checkAvailable = (status) => {
        if(status == 'Delivered' || status == 'Unpaid' || status == 'Paid'){
            return false;
        }
        else{
            return true;
        }
    }

    const handleReport = (e, itemID) => {
        e.preventDefault();
        navigate("/itemReport",{state:{itemID}});
    }

    return(
        <>
            <div class="recent-payments">
                <div class="title">
                    <h2>Undelivered Items</h2>
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Donated Date</th>
                        <th>Action</th>
                    </tr>
                    {
                        props.items.map((item) => {
                            if(checkAvailable(item.status)){
                                const link = item.afterMendUrl[0]? item.afterMendUrl[0] : item.url[0];
                                return(
                                    <tr key={item._id}>
                                        <td>
                                            <a href={link} target="_blank">
                                            <img src={link} height="100px" />
                                            </a>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.donatedDate}</td>
                                        <td>
                                            <a href="#" class="btn" onClick={(e)=>handleReport(e,item._id)}>Report</a>
                                        </td>
                                    </tr>
                                );   
                            }
                        })
                    }
                </table>
                </div>
        </>
    );
}

export default UndeliveredItems;