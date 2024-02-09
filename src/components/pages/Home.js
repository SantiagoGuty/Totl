import React from "react";
import "./Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <div className="home-search-bar">
        <input type="text" placeholder="Search..." className="home-search-input" />
        <button className="home-cite-button">Cite</button>
      </div>
      <button className="home-upload-button">Upload Manually</button>
    </div>
  );
}

export default Home;
