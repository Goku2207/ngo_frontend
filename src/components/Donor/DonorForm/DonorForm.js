import React, { useState } from 'react';
import './DonorForm.css';
import ImageCropper from '../../Agent/AgentForm/ImageCropper';
import axios from '../../../axios';
import { Button } from 'reactstrap';
import Spinner from '../../Utility/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const upload = async (file1, file2, file3, event, userInput, donorID, setLoading, navigate) => {
    console.log(donorID);
    if(userInput.itemName=="" || userInput.address==""){
        alert('Please fill all the details!');
        return;
    }
    if(file1==null){
        alert('Please upload at least 1 image!');
        return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file1);
    formData.append('donID', donorID);
    formData.append('name', userInput.itemName);
    formData.append('region', userInput.region);
    formData.append('category', userInput.category);
    formData.append('address', userInput.address);
    event.preventDefault();
    const response = await axios.post('/items/add',formData);
    if(response.status == 200){
        const id = response.data.id;
        console.log(response);
        if(file2){
            const formData = new FormData();
            formData.append('file', file2);
            formData.append('itemID',id);
            const response2 = await axios.post('/items/addImage',formData);
        }
        if(file3){
            const formData = new FormData();
            formData.append('file', file3);
            formData.append('itemID',id);
            const response3 = await axios.post('/items/addImage',formData);
        }
        setLoading(false);
        alert('Item Added Successfully!');
    }
    else{
        setLoading(false);
        alert(response.data.message);
    }
    navigate('/donorDashboard')
}

const DonorForm = (props) => {

    const regions = ["Region-1","Region-2","Region-3","Region-4","Region-5"];
    const category = ["Perishable Food Items","Stationary and Books","Furniture","Electronic Items","Clothes"];

    const location = useLocation();
    const navigate = useNavigate();

    const [userInput,setUserInput] = useState({
        itemName:"",
        address: "",
        category: category[0],
        region: regions[0]
    });

    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [file3,setFile3] = useState(null);
    const [uploadCnt, setUploadCnt] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({...userInput, [name] : value});
        console.log(userInput);
        console.log(file1);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if(uploadCnt>2)
            return;
        if(file1 == null || (uploadCnt == 1 && file2 == null) || (uploadCnt == 2 && file3 == null)){
            alert('Please Select file!');
            return;
        }
        setUploadCnt(uploadCnt+1);
    }

    let donorForm =
        <>
        {loading && <Spinner/>}
            <div class="wrapper">
        <div class="form-container">
            <div class="form">
                <div class="heading">
                    <h2>New Donation Request</h2>
                </div>


                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="itemName">Item Name</label>
                        <input type="text" value={userInput.itemName} onChange={handleInput} name="itemName" id="itemName" required/>
                    </div>
                </div>

                {/* <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="phone">Phone</label>
                        <input type="number" value={userInput.phone} onChange={handleInput} name="phone" id="phone" required/>
                    </div>
                </div> */}

                <div class="form-wrap select-box">
                    <div class="form-item">
                        <label>Category of Item</label>
                        <select name="category" value={userInput.category} onChange={handleInput}>
                            {
                                category.map((category) => {
                                    return(
                                        <option>{category}</option>
                                    );
                                })
                            }
                        </select>
                    </div>

                    <div class="form-item">
                        <label>Donation Region</label>
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
                        <label htmlFor="address">Address</label>
                        <input type="text" value={userInput.address} onChange={handleInput} name="address" id="address" required/>
                    </div>
                </div>

                <div class="form-wrap">
                    <div class="form-item">
                        <label>Please upload the picture of item (Max. 3)</label>
                        <button className='upload-count'>{uploadCnt}</button><span>{'  '}</span>
                        <button className='upload-button' onClick={(e)=>handleUpload(e)}>Upload</button>
                        {uploadCnt==0&&<ImageCropper uploadFile={image => {setFile1(image)}} />}
                        {uploadCnt==1&&<ImageCropper uploadFile={image => {setFile2(image)}} />}
                        {uploadCnt==2&&<ImageCropper uploadFile={image => {setFile3(image)}} />}
                    </div>
                </div>

                <br/>

                <div class="btn">
                    <input type="submit" value="Submit Request" onClick={(event) => upload(file1, file2, file3, event, userInput, location.state.donorID, setLoading, navigate)}/>
                </div>

            </div>
        </div>
    </div>
        </>;
    if(localStorage.getItem('type') == 'Donator'){
        return donorForm;
    }
    else{
        navigate('/home');
    }
}

export default DonorForm;