import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AgentDashboard.css';

const DashboardView = (props) => {

    const navigate = useNavigate();

    const handleAgentForm = (e,task,status) => {
        e.preventDefault();
        console.log(task);
        if(status == 'Pick Up'){
             navigate('/PickUpForm',{ state: { itemID:task._id }});
        }
        else if(status == 'Mend'){
             navigate('/agentForm',{ state: { itemID:task._id }});
        }
        else if(status == 'Deliver'){
             navigate('/deliveryForm', { state: { itemID:task._id }});
        }
     }

    return(
        <>
            <div class="recent-payments">
                <div class="title">
                    <h2>Pending/Completed Assignments</h2>
                </div>
                <table>
                    <tr>
                        <th>Donor Name</th>
                        <th> Donor Contact</th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Region</th>
                        <th>Action</th>
                    </tr>
                    {
                        props.assignedTasks.map((task) => {
                            return(
                                <tr key={task._id}>
                                    <td>{task.donorName}</td>
                                    <td>{task.donorContact}</td>
                                    <td>{task.name}</td>
                                    <td>{task.category}</td>
                                    <td>{task.region}</td>
                                    <td>
                                        {task.status=='Assigned'&&
                                            <a href="./pickUpForm" class="btn" onClick={(e)=>handleAgentForm(e,task,"Pick Up")}>Pick Up</a>}
                                        {task.status=='Picked Up'&&
                                            <a href="./agentForm" class="btn" onClick={(e)=>handleAgentForm(e,task,"Mend")}>Add Charges</a>}
                                        {(task.status=='Mended')&&
                                            <a href="./deliveryForm" class="btn" onClick={(e)=>handleAgentForm(e,task,"Deliver")}>Deliver</a>}
                                        {(task.status=='Delivered')&&
                                            <a href="#" class="btn">Unpaid</a>}
                                        {(task.status=='Paid')&&
                                            <a href="#" class="btn">Paid</a>}
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

export default DashboardView;