import React, {useState,useEffect} from "react";
import axios from "../../../axios";
import './AdminDashboard.css';
import Spinner from "../../Utility/Spinner";
import { useNavigate } from "react-router-dom";

const Agents = (props) => {

    const navigate = useNavigate();

    const [agentsData, setAgentsData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const response = await axios.post('/collector/',{});
            console.log(response);
            setLoading(false);
            setAgentsData(response.data.allCollectors);
        },500);
        return () => {clearTimeout(timer);};
    }, [refresh]);

    const handleRemove = async (e,id) =>{
        e.preventDefault();
        console.log(id);
        setLoading(true);
        try{
            const response = await axios.post('/collector/delete',{ collectorID: id});
            //console.log(response);
            setLoading(false);
            setRefresh(prevState=>{
                return !prevState;
            });
            alert(response.data.message);
        }
        catch(err){
            setLoading(false);
            alert(err.response.data.message);
        }
    }

    const handleHistory = (e, agent) => {
        e.preventDefault();
        navigate('/history',{ state: {id: agent._id, name: agent.name, email: agent.email, type: 'agent', mobile: agent.mobile }});
    }

    return(
        <>
        {loading && <Spinner/>}
        <div class="recent-payments">
                <div class="title">
                    <h2>Agents' Details</h2>
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Aadhar</th>
                        {/* <th>Mobile</th> */}
                        <th>Email</th>
                        <th>Region</th>
                        <th>Action</th>
                        {/* <th>Items Assigned</th> */}
                    </tr>
                    {
                        agentsData.map((agent)=>{
                            return(
                                <tr key={agent._id}>
                                    <td>{agent.name}</td>
                                    <td>{agent.aadhar}</td>
                                    {/* <td>{agent.mobile}</td> */}
                                    <td>{agent.email}</td>
                                    <td>{agent.region}</td>
                                    {/* <td>{agent.items.length}</td> */}
                                    <td>
                                        <a href="#" class="btn-agent" onClick={(e)=>handleRemove(e,agent._id)}>Remove</a>
                                    </td>
                                    <td>
                                        <a href="#" class="btn-agent" onClick={(e)=>handleHistory(e,agent)}>History</a>
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

export default Agents;