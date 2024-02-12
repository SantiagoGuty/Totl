import React,{ useState } from "react";
import axios from 'axios';

import './Citations.css';

export default function Citations(props) {
    let [fileTitle, setFileTitle] = useState("Untitled");
    let [fileContent, setFileContent] = useState("There are no citations added. Please upload or create a citation.");
    const [file, setFile] = useState()

    function handleChange(e) {
          setFile(e.target.files[0])
        }

    function handleFileSubmit(e) {
        if (!file) { 
            console.log("No file selected.");
            return; 
        }
        
        e.preventDefault()
        const url = 'http://localhost:3000/citations';
        const formData = new FormData();

        formData.append('file', file);
        //formData.append('fileName', file.name);
       /* const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }; */
        //axios.post(url, formData, config).then((response) => {
        axios.post(url, formData).then((response) => {
            setFileTitle(response.data.file.name);
            setFileContent(response.data.fileUrl);
        }); 
        //axios.post("api/uploadfile", formData);
    }
    /*Used https://www.filestack.com/fileschool/react/react-file-upload/
    https://www.geeksforgeeks.org/file-uploading-in-react-js/#
    */
    return (
    <div id="file" className="container-fluid"> 
        <div className="row">
            <div className="file-container">
                <h2 className="file-title">{fileTitle}</h2>
                <div className="files"><pre>
                    <p>{fileContent}</p> 
                </pre></div>
                <input onChange={handleChange} type="file"/>
                <button onClick={handleFileSubmit} type="submit" >Upload citation</button> 
            </div>
        </div>
    </div>
    )
}
