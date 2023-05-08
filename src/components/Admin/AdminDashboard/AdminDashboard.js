import React, { useState, useEffect, useContext } from 'react';
import img1 from './settings.png';
import donate from './income.png';
import search from './search.png';
import user from './user.png';
import notifs from './notifications.png';
import info from './info.png';
import './AdminDashboard.css';
import axios from '../../../axios';
import DonatedItems from './DonatedItems';
import Agents from './Agents';
import Donors from './Donors';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/context/auth';
import { logout } from '../../Auth/Utility';
import Spinner from '../../Utility/Spinner';

const AdminDashboard = (props) => {
    
    const navigate = useNavigate();
    const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
    const [donatedItems,setDonatedItems] = useState([]);
    const [updateComponent, setUpdateComponent] = useState(false);
    const [agentRequest, setAgentRequests] = useState([]);
    const [tabView, setTabView] = useState("Admin");
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            const response = await axios.get('/donator/size');
            setStats(response.data.sizes);
            //console.log(response);
            const resDonatedItems = await axios.post('/items/',{page:1,limit:100});
            //console.log(resDonatedItems);
            setDonatedItems(resDonatedItems.data.products);
            const resAgentRequests = await axios.post('/admin/requests',{page:1,limit:100});
            //console.log(resAgentRequests);
            setAgentRequests(resAgentRequests.data.allRequests);
            setLoading(false);
        },500);
        return () => {clearTimeout(timer);};
    }, [updateComponent]);

    const handleApproval = async (e, agentID, approval) =>{
        e.preventDefault();
        setLoading(true);
        const response = await axios.post('/admin/approval',{_id: agentID, approval:approval});
        setLoading(false);
        if(response.status == 200){
            setUpdateComponent(prevState=>{
                return !prevState;
            })
        }
        else{
            alert(response.message);
        }
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
            <h1>Admin Panel</h1>
        </div>
        <ul>
            <a href="#" onClick={(e)=>handleChange(e,'Admin')}><li className={tabView=='Admin'?'highlight':''}><img src={img1} alt=""/>&nbsp; <span>Dashboard</span></li></a>
            <a href="./Donor" onClick={(e)=>handleChange(e,'Donor')}><li className={tabView=='Donor'?'highlight':''}><img src={img1} alt=""/>&nbsp; <span></span>Donors</li></a>
            <a href="./Agent" onClick={(e)=>handleChange(e,'Agent')}><li className={tabView=='Agent'?'highlight':''}><img src={img1} alt=""/>&nbsp; <span></span>Agent</li></a>
            {/* <li><img src={img1} alt=""/>&nbsp; <span></span>Regions</li>
            <li><img src={img1} alt=""/>&nbsp; <span></span>Categories</li> */}
            {/* <li><img src={img1} alt=""/>&nbsp; <span></span>Help-desk</li>
            <li><img src={img1} alt=""/>&nbsp; <span></span>Settings</li> */}
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
                {tabView=='Admin'&&
                    <DonatedItems donatedItems={donatedItems} setUpdateComponent={setUpdateComponent}/>}
                {tabView=='Agent'&&
                    <Agents/>}
                {tabView=='Donor'&&
                    <Donors/>}
                <div class="new-students">
                    <div class="title">
                        <h2>Pending Approval</h2>
                    </div>
                    <table>
                        <tr>
                            <th>Agent</th>
                            <th>Region</th>
                            {/* <th>Approve</th> */}
                        </tr>
                        {
                            agentRequest.map((agent)=>{
                                return(
                                    <tr>
                                        <td>{agent.name}</td>
                                        <td>{agent.region}</td>
                                        <td><a href="#" class="btn" onClick={(e)=>handleApproval(e,agent._id,1)}>Accept</a></td>
                                        <td><a href="#" class="btn" onClick={(e)=>handleApproval(e,agent._id,0)}>Reject</a></td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default AdminDashboard;