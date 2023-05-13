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
import DashboardView from './DashboardView';
import UndeliveredItems from './UndeliveredItems';

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

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log(collectorID);
        navigate("/updateProfile",{state:{collectorID}});
    }

    const handleChange = (e,view) => {
        e.preventDefault();
        setTabView(view);
    }

    const handleUndeliveredItems = (e) => {
        e.preventDefault();
        setTabView('Undelivered');
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
            <a href="#" onClick={(e)=>handleUpdateProfile(e)}> <li><img src={img1} alt=""/>&nbsp; Update Profile</li></a>
            <a href="#" onClick={(e)=>handleUndeliveredItems(e)}> <li className={tabView=='Undelivered'?'highlight':''}><img src={img1} alt=""/>&nbsp; Undelivered Items</li></a>
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
                {tabView=='Dashboard' && <DashboardView assignedTasks={assignedTasks} />}
                {tabView=='Undelivered' && <UndeliveredItems items={assignedTasks} />}
            </div>
        </div>
    </div>
        </>
    );            
}

export default AgentDashboard;