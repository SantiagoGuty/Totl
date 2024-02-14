import React, { useState } from "react";
//import axios from 'axios';
import './Manual.css';


export default function Manual(props) {
    /*let [fileTitle, setFileTitle] = useState("Untitled");
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
        const url = '';
        const formData = new FormData();

        formData.append('file', file);
        axios.post(url, formData, {
            'Content-Type': 'application/json',
           },{
            data: {username: '', password: ''}
        }).then((response) => {
            setFileTitle(response.data.file.name);
            setFileContent(response.data.fileUrl);
        }).catch(err => console.log(err)); 
 
    }
*/
    function handleBack() {
        props.onBack(); // Call the onBack function passed from the parent component
    }
    const [formData, setFormData] = useState({
        style: "",
        source: "",
        firstname: "",
        lastname: "",
        title: "",
        year: "",
        publisher: "",
        isbn: "",
        url: "",
      });

    return (
        <div className="manualreference-popup">
            <h1>Create Your Citation</h1>
            <form>
                <div>
                    <label className="dropdown-label">Citation Style: </label>
                    <select className="citestyle-dropdown" name="style">
                        <option value="chicago">Chicago</option>
                    </select>
                </div>
                <div>
                    <label className="dropdown-label">Source: </label>
                    <select className="citesource-dropdown" name="source">
                        <option value="book">Book</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div><label>Author's First Name: <input type="text" name="firstname" /></label></div>
                <div><label>Author's Last Name: <input type="text" name="lastname" /></label></div>
                <div><label>Title: <input type="text" name="title" /></label></div>
                <div><label>Year: <input type="text" name="year" /></label></div>
                <div><label>Publisher: <input type="text" name="publisher" /></label></div>
                <div><label>ISBN: <input type="text" name="isbn" /></label></div>
                <div><label>URL: <input type="text" name="url" /></label></div>
            </form>
        </div>
    );
}