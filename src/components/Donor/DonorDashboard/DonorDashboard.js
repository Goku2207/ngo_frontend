import React, { useState, useEffect, useContext } from 'react';
import img1 from './settings.png';
import donate from './income.png';
import search from './search.png';
import user from './user.png';
import notifs from './notifications.png';
import info from './info.png';
import './DonorDashboard.css';
import axios from '../../../axios';
import DonorForm from '../DonorForm/DonorForm';
import { logout } from '../../Auth/Utility';
import AuthContext from '../../../store/context/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Utility/Spinner';

const DonorDashboard = () => {

    const navigate = useNavigate();
    const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
    const [donator, setDonator] = useState({});
    const [donatedItems, setDonatedItems] = useState([]);
    const [tabView, setTabView] = useState("Dashboard");
    const [displayDashboard, setDisplayDashboard] = useState(true);
    const [donatorID,setDonatorID] = useState(localStorage.getItem('user'));
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            const response = await axios.get('/donator/size');
            setStats(response.data.sizes);
            const resDonator = await axios.post('/donator/get',{donatorID: donatorID});
            //console.log(resDonator);
            setDonator(resDonator.data.donator);
            const resDonatedItems = await axios.post('/donator/items',{donatorID:donatorID});
            //console.log(resDonatedItems);
            setDonatedItems(resDonatedItems.data.donatedItems);
            setLoading(false);
        },500);
        return () => {clearTimeout(timer);};
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);
            const response = await axios.get('/donator/size');
            setStats(response.data.sizes);
            const resDonatedItems = await axios.post('/donator/items',{donatorID:donatorID});
            console.log(resDonatedItems);
            setDonatedItems(resDonatedItems.data.donatedItems);
            setLoading(false);
        },500);
        return () => {clearTimeout(timer);};
    }, [displayDashboard]);

    const handlePickUp = (e) => {
        e.preventDefault();
        setDisplayDashboard(prevState=>{
            return !prevState;
        })
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
    
    const donorDashboard = 
        <>
            <div class="side-menu">
        <div class="brand-name">
            <h1>{donator.name}</h1>
        </div>
        <ul>
            <a href="#" onClick={(e)=>handleChange(e,'Dashboard')}><li className={tabView=='Dashboard'?'highlight':''}><img src={img1} alt=""/>&nbsp; <span>Dashboard</span></li></a>
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
                    <a href="/" class="btn" onClick={(event) => handleLogout(event)}>Log Out</a>
                    {/* <img src={notifs} alt=""/> */}
                    {/* <a href="#" class="btn" onClick={(e)=>handlePickUp(e)}>Request Pickup</a> */}
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
                    <h2>Past Dontions</h2>
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Category</th>
                        <th>Agent's Name</th>
                        <th>Agent's Contact</th>
                        <th>Status</th>
                    </tr>
                    {
                        donatedItems.map((items)=>{
                            return(
                                <tr>
                                    <td><img src={items.url[0]} height="100px" /></td>
                                    <td>{items.name}</td>
                                    <td>{items.region}</td>
                                    <td>{items.category}</td>
                                    <td>{items.collectorName}</td>
                                    <td>{items.collectorContact}</td>
                                    <td>
                                        {(items.status=='Unpaid'||items.status=='Paid')&&
                                            <a class="btn">Delivered</a>}
                                        {!(items.status=='Unpaid'||items.status=='Paid')&&
                                            <a class="btn">{items.status}</a>}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </table>
                </div>
                <div class="new-students">
                    <div class="title">
                        <h2>Request PickUp</h2>
                        <a href="#" class="btn" onClick={(e)=>handlePickUp(e)}>Form</a>
                    </div>
                    <table>
                        <tr>
                        <td>Fill Up the form for a new donation and request pickup</td>                           
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
        </>;
    
    if(displayDashboard)
        return donorDashboard;
    else
        return <DonorForm donorID={donatorID} setDisplayDashboard={setDisplayDashboard} />

}

export default DonorDashboard;