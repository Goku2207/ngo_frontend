import React, { useState, useEffect } from 'react';
import './AgentForm.css';
import axios from '../../../axios';
import Spinner from '../../Utility/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfileForm = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [userInput,setUserInput] = useState({
        collectorID: location.state.collectorID,
        email:"",
        mobile:""
    });
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        //e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({...userInput, [name] : value});
        // console.log(props);
        // props.setDisplayDashboard(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userInput.email=="" && userInput.mobile==""){
            alert('At least update any 1 field!');
            return;
        }
        setLoading(true);
        const response = await axios.post('/collector/updateProfile',userInput);
        setLoading(false);
        if(response.status == 200){
            alert('Profile Updated!');
        }
        else{
            alert(response.message);
        }
        navigate('/agentDashboard');
    }

    return(
        <>
        {loading && <Spinner/>}
            <div class="wrapper">
        <div class="form-container">
            <div class="form">
                <div class="heading">
                    <h2>Update Profile</h2>
                </div>

                {/* <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="id">Collector ID</label>
                        <p>{props.collectorID}</p>
                    </div>
                </div> */}

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="name">Email</label>
                        <input type="text" value={userInput.email} onChange={handleInput} name="email" id="email"/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="name">Mobile</label>
                        <input type="number" value={userInput.mobile} onChange={handleInput} name="mobile" id="mobile"/>
                    </div>
                </div>

                <br/>

                <div class="btn">
                    <input type="submit" value="Submit Request" onClick={(e)=>handleSubmit(e)}/>
                </div>

            </div>
        </div>
    </div>
        </>
    )
}

export default UpdateProfileForm;