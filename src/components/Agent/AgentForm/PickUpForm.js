import React, { useState, useEffect } from 'react';
import './AgentForm.css';
import axios from '../../../axios';
import ImageCropper from './ImageCropper';
import Spinner from '../../Utility/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const upload = async (file1, file2, file3, event, itemID, setLoading, navigate) => {
    if(file1==null){
        alert('Please upload atleast 1 image!');
        return;
    }
    console.log(file1);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file1);
    formData.append('itemID', itemID);
    event.preventDefault();
    const response = await axios.post('/collector/itemCollect',formData);
    if(response.status == 200){
        console.log(response);
        if(file2){
            const formData = new FormData();
            formData.append('file', file2);
            formData.append('itemID',itemID);
            const response2 = await axios.post('/collector/itemCollect',formData);
        }
        if(file3){
            const formData = new FormData();
            formData.append('file', file3);
            formData.append('itemID',itemID);
            const response3 = await axios.post('/collector/itemCollect',formData);
        }
        setLoading(false);
        alert('Item Status Updated!');
    }
    else{
        setLoading(false);
        alert(response.message);
    }
    navigate("/agentDashboard");
}

const PickUpForm = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        itemID: location.state.itemID,
        file:null
    });

    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [file3,setFile3] = useState(null);
    const [uploadCnt, setUploadCnt] = useState(0);
    const [loading, setLoading] = useState(false);

    // const handleInput = (e) => {
    //     //e.preventDefault();
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setUserInput({...userInput, [name] : value});
    //     // console.log(props);
    //     // props.setDisplayDashboard(true);
    // }

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

    return(
        <>
        {loading && <Spinner/>}
            <div class="wrapper">
        <div class="form-container">
            <div class="form">
                <div class="heading">
                    <h2>Pick Up Form</h2>
                </div>

                {/* <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="id">Consignment ID</label>
                        <p>{props.itemID}</p>
                    </div>
                </div> */}

                <div class="form-wrap">
                    <div class="form-item">
                        <label>Please upload the condition of item(Max. 3)</label>
                        <button className='upload-count'>{uploadCnt}</button><span>{'  '}</span>
                        <button className='upload-button' onClick={(e)=>handleUpload(e)}>Upload</button>
                        {uploadCnt==0&&<ImageCropper uploadFile={image => {setFile1(image)}} />}
                        {uploadCnt==1&&<ImageCropper uploadFile={image => {setFile2(image)}} />}
                        {uploadCnt==2&&<ImageCropper uploadFile={image => {setFile3(image)}} />}
                   </div>
                </div>
                
                <br/>

                <div class="btn">
                    <input type="submit" value="Submit Request" onClick={(event) => upload(file1, file2, file3, event, userInput.itemID, setLoading, navigate)}/>
                </div>

            </div>
        </div>
    </div>
        </>
    )
}

export default PickUpForm;