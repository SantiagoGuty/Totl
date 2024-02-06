import { useState } from "react";
import axios from 'axios';

function FileContainer() {
    let [fileTitle, setFileTitle] = useState("Untitled");
    let [fileContent, setFileContent] = useState("There are no citations added. Please upload or create a citation.");
        //Using <pre> to keep formatting. This is not a preferred way.
        //Set fileContent to whatever the user gives it.
    const [file, setFile] = useState()

    function handleChange(event) {
          setFile(event.target.files[0])
        }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            setFileContent(response.data.fileUrl);
        });
    }
    /*upload citation throws a "Cannot read properties of undefined (reading 'name')
TypeError: Cannot read properties of undefined (reading 'name')" error. Used https://www.filestack.com/fileschool/react/react-file-upload/*/
    return (
    <div id="file" className="container-fluid"> 
        <div className="row">
            <div className="file-container">
                <h2 className="file-title">{fileTitle}</h2>
                <div className="files"><pre>
                    <p>{fileContent}</p> 
                    
                </pre></div>
                <form onSubmit={handleSubmit}>
                    <input type="file" />
                    <button type="submit" onChange={handleChange}>Upload citation</button> 
                </form>
            </div>
        </div>
    </div>
    )
}

export default FileContainer;
