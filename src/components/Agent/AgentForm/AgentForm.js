import React, { useState } from 'react';
import './AgentForm.css';
import axios from '../../../axios';
import ImageCropper from './ImageCropper';
import 'react-image-crop/dist/ReactCrop.css';
import Spinner from '../../Utility/Spinner';

const upload = async (file1, file2, file3, event, itemID, charges, desc, setType, setDisplayDashboard, setLoading) => {
    console.log(file1);
    if(charges=="" || desc==""){
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
    formData.append('itemID', itemID);
    formData.append('charges', charges);
    formData.append('desc', desc);
    formData.append('onlyImg',0);
    event.preventDefault();
    const response = await axios.post('/collector/itemUpdate',formData);
    await setType("");
    if(response.status == 200){
        console.log(response);
        if(file2){
            const formData = new FormData();
            formData.append('file', file2);
            formData.append('itemID',itemID);
            formData.append('onlyImg',1);
            const response2 = await axios.post('/collector/itemUpdate',formData);
        }
        if(file3){
            const formData = new FormData();
            formData.append('file', file3);
            formData.append('itemID',itemID);
            formData.append('onlyImg',1);
            const response3 = await axios.post('/collector/itemUpdate',formData);
        }
        setLoading(false);
        await setDisplayDashboard(true);
        alert('Item Updated Successfully!');
    }
    else{
        setLoading(false);
        alert(response.message);
    }
    
}

const AgentForm = (props) => {

    const [userInput,setUserInput] = useState({
        itemID: props.itemID,
        charges:"",
        desc:""
    });

    //const [file, setFile] = useState(null);
    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [file3,setFile3] = useState(null);
    const [uploadCnt, setUploadCnt] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        //e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUserInput({...userInput, [name] : value});
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

    return(
        <>
        {loading && <Spinner/>}
            <div class="wrapper">
        <div class="form-container">
            <div class="form">
                <div class="heading">
                    <h2>Overhead Charges Form</h2>
                </div>

                {/* <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="id">Consignment ID</label>
                        <p>{props.itemID}</p> 
                    </div>
                </div> */}

                <div class="form-wrap">
                    <div class="form-item">
                        <label htmlFor="charges">Total Cost incurred</label>
                        <input type="number" value={userInput.charges} onChange={handleInput} name="charges" id="charges" required/>
                    </div>
                    <div class="form-item">
                        <label htmlFor="charges">Description(Changes done to the item)</label>
                        <input type="text" value={userInput.desc} onChange={handleInput} name="desc" id="desc" required/>
                    </div>
                </div>
                <div class="form-wrap">
                    <div class="form-item">
                        <label>Please upload the picture of Mended item(Max. 3)</label>
                        <button className='upload-count'>{uploadCnt}</button><span>{'  '}</span>
                        <button className='upload-button' onClick={(e)=>handleUpload(e)}>Upload</button>
                        {uploadCnt==0&&<ImageCropper uploadFile={image => {setFile1(image)}} />}
                        {uploadCnt==1&&<ImageCropper uploadFile={image => {setFile2(image)}} />}
                        {uploadCnt==2&&<ImageCropper uploadFile={image => {setFile3(image)}} />}
                   </div>
                </div>
                <br/>

                <div class="btn">
                    <input type="submit" value="Submit Request" onClick={(event) => upload(file1, file2, file3, event, userInput.itemID, userInput.charges, userInput.desc, props.setType, props.setDisplayDashboard, setLoading)}/>
                </div>

            </div>
        </div>
    </div>
        </>
    )
}

export default AgentForm;