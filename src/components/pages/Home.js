import React, { useState } from "react";
import { FileContainer } from "./links/FileContainer";
import Manual from "./links/Manual"; // Import Manual without curly braces
import "./Home.css";

function Home() {
    const [showCitations, setShowCitations] = useState(false);
    const [showManual, setShowManual] = useState(false); // State to control showing manual entry form

    function handleBackFromCitations() {
        setShowCitations(false); // Set showCitations to false to hide the Citations component
    }

    function handleUpload() {
        // Add functionality for uploading here
        setShowCitations(true); // Show the Citations component
    }

    function handleManualEntry() {
        setShowManual(true); // Show manual entry form
    }

    function handleBackFromManual() {
        setShowManual(false); // Hide manual entry form
    }

    return (
        <div className="home-container">
            <div className="home-search-bar">
                <input type="text" placeholder="Search..." className="home-search-input" />
                <button className="home-cite-button">Cite</button>
            </div>
            <div className="home-button-container">
                <button className="home-upload-button" onClick={handleUpload}>Upload</button>
                <button className="home-manual-entry-button" onClick={handleManualEntry}>Manual Entry</button>
            </div>
            {showCitations && <FileContainer onBack={handleBackFromCitations} />}
            {showManual && <Manual onBack={handleBackFromManual} />} {/* Show manual entry form if showManual is true */}
        </div>
    );
}

export default Home;
