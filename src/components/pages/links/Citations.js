import React, { useState } from "react";
import axios from 'axios';
import './Citations.css';

export function Citations(props) {
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
        axios.post(url, formData).then((response) => {
            setFileTitle(response.data.file.name);
            setFileContent(response.data.fileUrl);
        }); 
    }

    function handleBack() {
        props.onBack(); // Call the onBack function passed from the parent component
    }

    return (
        <div className="file-popup">
            <h2 className="file-title">{fileTitle}</h2>
            <div className="files">
                <pre>
                    <p>{fileContent}</p> 
                </pre>
            </div>
            <input onChange={handleChange} type="file"/>
            <div>
                <button onClick={handleFileSubmit} type="submit">Upload citation</button>
                <button onClick={handleBack} className="back-button">Back</button> 
            </div>
        </div>
    );
}
