import React, { useEffect, useState, useContext } from 'react';
import img1 from './settings.png';
import donate from './income.png';
import search from './search.png';
import user from './user.png';
import notifs from './notifications.png';
import info from './info.png';
import './AgentDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { logout } from '../../Auth/Utility';
import AuthContext from '../../../store/context/auth';
import Spinner from '../../Utility/Spinner';

const AgentDashboard = () => {

    const navigate = useNavigate();
    const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [collectorID,setCollectorID] = useState(localStorage.getItem('user'));
    const [agentData, setAgentData] = useState({});
    const [tabView, setTabView] = useState("Dashboard");
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            const response = await axios.get('/donator/size');
            setStats(response.data.sizes);
            const resAgent = await axios.post('/collector/get',{collectorID: collectorID});
            //console.log(resAgent);
            setAgentData(resAgent.data.collector);
            const resAssigned = await axios.post('/collector/assignedItems',{collectorID: collectorID});
            //console.log(response);
            setAssignedTasks(resAssigned.data.assignedItems);
            setLoading(false);
        },500);
        return () => {clearTimeout(timer);};
    }, []);

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

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log(collectorID);
        navigate("/updateProfile",{state:{collectorID}});
    }

    const handleChange = (e,view) => {
        e.preventDefault();
        setTabView(view);
    }

    const handleLogout = (event) => {
        logout(event, authDispatch);
        navigate("/home");
    }
   
    const [regionCount,setRegionCount] = useState("4");

    return(
        <>
            <div class="side-menu">
        <div class="brand-name">
            <h1>{agentData.name}</h1>
        </div>
        <ul>
            <a href="#" onClick={(e)=>handleChange(e,'Dashboard')}><li className={tabView=='Dashboard'?'highlight':''}><img src={img1} alt=""/>&nbsp; <span>Dashboard</span></li></a>
            <a href="../AgentForm/UpdateProfile" onClick={(e)=>handleUpdateProfile(e)}> <li><img src={img1} alt=""/>&nbsp; Update Profile</li></a>
        </ul>
    </div>
    <div class="container">
        <div class="header">
            <div class="nav">
                {/* <div class="search">
                    <input type="text" placeholder="Search.."/>
                    <button type="submit"><img src={search} alt=""/></button>
                </div> */}
                <div class="user">
                    <a href="#" class="btn" onClick={(event) => handleLogout(event)}>Log Out</a>
                    {/* <img src={notifs} alt=""/> */}
                    <div class="img-case">
                        <img src={user} alt=""/> 
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="cards">
                <div class="card">
                    <div class="box">
                        <h1>{stats.itemSize}</h1>
                        <h3>Donations</h3>
                    </div>
                    <div class="icon-case">
                        <img src={donate} alt=""/>
                    </div>
                </div>
                <div class="card">
                    <div class="box">
                        <h1>{stats.donatorSize}</h1>
                        <h3>Notable Donors</h3>
                    </div>
                    <div class="icon-case">
                        <img src={donate} alt=""/>
                    </div>
                </div>
                <div class="card">
                    <div class="box">
                        <h1>{regionCount}</h1>
                        <h3>Regions</h3>
                    </div>
                    <div class="icon-case">
                        <img src={donate} alt=""/>
                    </div>
                </div>
                <div class="card">
                    <div class="box">
                        <h1>{stats.collectorSize}</h1>
                        <h3>Volunteers</h3>
                    </div>
                    <div class="icon-case">
                        <img src={donate} alt=""/>
                    </div>
                </div>
            </div>
            <div class="content-2">
                {loading && <Spinner/>}
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
                        assignedTasks.map((task) => {
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
                {/* <div class="new-students">
                    <div class="title">
                        <h2>Charge settlement</h2>
                        <a href="#" class="btn">Form</a>
                    </div>
                    <table>
                        <tr>
                        <td>Form for overhead charges of completed pickups</td>                           
                        </tr>
                    </table>
                </div> */}
            </div>
        </div>
    </div>
        </>
    );            
}

export default AgentDashboard;