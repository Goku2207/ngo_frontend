import React, { useState } from 'react';
import './Register.css';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Utility/Spinner';

const Register = () => {

    const navigate = useNavigate();

    const regions = ["Region-1","Region-2","Region-3","Region-4","Region-5"];
    const category = ["Donator","Agent"];

    const [userInput,setUserInput] = useState({
        userfirstname: "",
        userlastname: "",
        email: "",
        mobile: "",
        region: regions[0],
        aadhar: "",
        password: "",
        category: category[0]
    });
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({...userInput, [name] : value});
        //console.log(userInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userInput.userfirstname==""||userInput.email==""||userInput.aadhar==""||userInput.password==""||userInput.mobile==""){
            alert('Please fill all the fields');
            return;
        }
        setLoading(true);
        const cat = userInput.category == 'Donator' ? 0 : 1;
        const name = userInput.userfirstname + " "+ userInput.userlastname;
        try{
            const response = await axios.post('/auth/register', {
                name: name,
                email: userInput.email,
                mobile: userInput.mobile,
                region: userInput.region,
                aadhar: userInput.aadhar,
                password: userInput.password,
                category: cat
            });
            console.log(response);
            setLoading(false);
            if(response.status == 200){
                alert(response.data.message);
                navigate("/login");
            }
            else{
                alert(response.data.message);
                navigate("/home");
            }
        }
        catch(err){
            console.log(err);
            setLoading(false);
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
                    <h2>Sign Up</h2>
                </div>


                <div class="form-wrap fullname">
                    <div class="form-item">
                        <label htmlFor="userfirstname">First Name</label>
                        <input type="text" value={userInput.userfirstname} onChange={handleInput} name="userfirstname" id="userfirstname" required/>
                    </div>
                    <div class="form-item">
                        <label htmlFor="userlastname">Last Name</label>
                        <input type="text" value={userInput.userlastname} onChange={handleInput} name="userlastname" id="userlastname" required/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="email">E-mail Address</label>
                        <input type="email" value={userInput.email} onChange={handleInput} name="email" id="email" required/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="number" value={userInput.mobile} onChange={handleInput} name="mobile" id="mobile" required/>
                    </div>
                </div>

                <div class="form-wrap select-box">
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
                        <label>Region</label>
                        <select name="region" value={userInput.region} onChange={handleInput}>
                        {
                            regions.map((region) => {
                                return(
                                    <option>{region}</option>
                                );
                            })
                        }
                        </select>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="aadhar">Aadhar</label>
                        <input type="number" value={userInput.aadhar} onChange={handleInput} name="aadhar" id="aadhar" required/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={userInput.password} onChange={handleInput} name="password" id="password" required/>
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

export default Register;