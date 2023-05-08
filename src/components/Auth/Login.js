import React, { useState, useContext } from 'react';
import './Register.css';
import axios from '../../axios';
import authContext from '../../store/context/auth';
import * as actions from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Utility/Spinner';

const Login = () => {

    const navigate = useNavigate();
    const {state, dispatch} = useContext(authContext);
    const category = ["Donator","Agent","Admin"];
    const [userInput,setUserInput] = useState({
        email: "",
        password: "",
        category: category[0]
    });
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({...userInput, [name] : value})
    }

    const handleAdminLogin = async () => {
        const data = {name: userInput.email, password: userInput.password};
        try{
            const response = await axios.post("/admin/adlogin",data);
            setLoading(false);
            if(response.status == 200){
                console.log(response);
                localStorage.setItem('auth', true);
                localStorage.setItem('type', 'Admin');
                await dispatch(actions.authSuccess(response.data.user._id));
                navigate("/adminDashboard");
            }
            else{
                alert(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
            dispatch(actions.authFail(err.response.data.message));
            alert(err.response.data.message);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(userInput.category=='Admin'){
            return handleAdminLogin();
        }
        const cat = userInput.category == 'Donator' ? 0 : 1;
        const navigatePath = cat==0 ? '/donorDashboard' : '/agentDashboard';
        try{
            const data = {email: userInput.email, password: userInput.password, category: cat};
            const response = await axios.post("/auth/login",data);
            setLoading(false);
            if(response.status == 200){
                console.log(response);
                localStorage.setItem('auth', true);
                localStorage.setItem('type', userInput.category);
                await dispatch(actions.authSuccess(response.data.user._id));
                navigate(navigatePath);
            }
            else{
                alert(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
            dispatch(actions.authFail(err.response.data.message));
            alert(err.response.data.message);
        }
    }

    return(
        <>
        {loading && <Spinner/>}
            <div class="wrapper">
        <div class="form-container">
            <div class="form">
                <div class="heading">
                    <h2>Sign In</h2>
                </div>
                
                

                <div class="form-wrap">

                <div class="form-item">
                        <label>User Type</label>
                        <select name="category" value={userInput.category} onChange={handleInput}>
                        {
                            category.map((cat) => {
                                return(
                                    <option>{cat}</option>
                                );
                            })
                        }
                        </select>
                    </div>

                    <div class="form-item">
                        <label htmlFor="email">E-mail Address</label>
                        <input type="email" value={userInput.email} onChange={handleInput} name="email" id="email" required/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={userInput.password} onChange={handleInput} name="password" id="password" required/>
                    </div>
                </div>

                <div class="btn">
                    <input type="submit" value="Submit Request" onClick={(e)=>handleLogin(e)}/>
                </div>

            </div>
        </div>
    </div>
        </>
    )
}

export default Login;