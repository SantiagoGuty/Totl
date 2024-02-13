import React, { useState } from "react";
import { Citations } from "./links/Citations"; 
import "./Home.css";

function Home() {
    const [showCitations, setShowCitations] = useState(false);

    function handleBackFromCitations() {
        setShowCitations(false); // Set showCitations to false to hide the Citations component
    }

    return (
        <div className="home-container">
            <div className="home-search-bar">
                <input type="text" placeholder="Search..." className="home-search-input" />
                <button className="home-cite-button">Cite</button>
            </div>
            <button className="home-upload-button" onClick={() => setShowCitations(true)}>Upload Manually</button>
            {showCitations && <Citations onBack={handleBackFromCitations} />} {/* Pass the function to handle back action */}
        </div>
    );
}

export default Home;
