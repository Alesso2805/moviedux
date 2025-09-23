import React from "react";
import '../styles.css';

export default function Header() {
  return (
        <div className="header">    
            <img src="logo.png" alt="moviedux" className="logo" />
            <h2 className="app-subtitle">It is time for popcorn!!! Find your next movie here</h2>
        </div>
  );
}