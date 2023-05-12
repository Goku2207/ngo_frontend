import React, {useState,useEffect} from "react";
import axios from "../../../axios";
import './AdminDashboard.css';
import Spinner from "../../Utility/Spinner";
import { useNavigate } from "react-router-dom";

const Donors = (props) => {

    const navigate = useNavigate();

    const [donorsData, setDonorsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const response = await axios.post('/donator/',{});
            console.log(response);
            setLoading(false);
            setDonorsData(response.data.allDonators);
        },500);
        return () => {clearTimeout(timer);};
    }, []);

    const handleHistory = (e, donor) => {
        e.preventDefault();
        navigate('/history',{ state: {id: donor._id, name: donor.name, email: donor.email, type: 'donor' }});
    }

    return(
        <>
        {loading && <Spinner/>}
        <div class="recent-payments">
                <div class="title">
                    <h2>Donors' Details</h2>
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        {/* <th>Region</th> */}
                        <th>Items Donated</th>
                    </tr>
                    {
                        donorsData.map((donor)=>{
                            return(
                                <tr key={donor._id}>
                                    <td>{donor.name}</td>
                                    <td>{donor.mobile}</td>
                                    <td>{donor.email}</td>
                                    {/* <td>{donor.region}</td> */}
                                    <td>{donor.items.length}</td>
                                    <td>
                                        <a href="#" class="btn" onClick={(e)=>handleHistory(e,donor)}>History</a>
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

export default Donors;