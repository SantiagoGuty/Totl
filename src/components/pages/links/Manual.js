import React, { useState } from "react";
import "./Manual.css"; // Import the CSS file for styling

function Manual({ onBack }) {
    const [formData, setFormData] = useState({
        style: "chicago",
        source: "book",
        firstname: "",
        lastname: "",
        title: "",
        year: "",
        publisher: "",
        isbn: "",
        url: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        // Add functionality to handle form submission here
    }

    function handleBack() {
        onBack(); // Call the onBack function passed from props
    }

    return (
        <div className="file-popup">
            <h2>Create Your Citation</h2>
            <br /> 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Citation Style:  </label>
                    <select className="form-control" name="style" onChange={(e) => setFormData({...formData, style: e.target.value})}>
                        <option value="chicago">Chicago</option>
                        <option value="mla">MLA</option>
                        <option value="apa">APA</option>
                        <option value="turabian">Turabian</option>
                        <option value="harvard">Harvard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Source:     </label>
                    <select className="form-control" name="source" onChange={(e) => setFormData({...formData, source: e.target.value})}>
                        <option value="book">Book</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group"><label>Author's First Name: <input className="form-control" type="text" name="firstname" onChange={(e) => setFormData({...formData, firstname: e.target.value})} /></label></div>
                <div className="form-group"><label>Author's Last Name: <input className="form-control" type="text" name="lastname" onChange={(e) => setFormData({...formData, lastname: e.target.value})} /></label></div>
                <div className="form-group"><label>Title: <input className="form-control" type="text" name="title" onChange={(e) => setFormData({...formData, title: e.target.value})} /></label></div>
                <div className="form-group"><label>Year: <input className="form-control" type="text" name="year" onChange={(e) => setFormData({...formData, year: e.target.value})} /></label></div>
                <div className="form-group"><label>Publisher: <input className="form-control" type="text" name="publisher" onChange={(e) => setFormData({...formData, publisher: e.target.value})} /></label></div>
                <div className="form-group"><label>ISBN: <input className="form-control" type="text" name="isbn" onChange={(e) => setFormData({...formData, isbn: e.target.value})} /></label></div>
                <div className="form-group"><label>URL: <input className="form-control" type="text" name="url" onChange={(e) => setFormData({...formData, url: e.target.value})} /></label></div>
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
}

export default Manual;
