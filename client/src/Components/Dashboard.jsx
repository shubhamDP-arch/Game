import React from "react";
import { useNavigate } from 'react-router-dom';
import '/styles/Dashboard.css'

function Dashboard(){
    const Navigate= useNavigate();
    function handle(){
       Navigate("/login")
    }
    return(
        <div>
        <section className="hero">
        <h1>Welcome to Your Next Adventure!</h1>
        <p>Discover the best we have to offer, right here.</p>
        <div className="hero-buttons">
            <button className="cta">Get Started</button>
            <button className="cta">Learn More</button>
        </div>
    </section>

    
    <section className="features">
        <div className="feature-card">
            <h2>Feature 1</h2>
            <p>Amazing description of Feature 1.</p>
        </div>
        <div className="feature-card">
            <h2>Feature 2</h2>
            <p>Amazing description of Feature 2.</p>
        </div>
        <div className="feature-card">
            <h2>Feature 3</h2>
            <p>Amazing description of Feature 3.</p>
        </div>
    </section>

    <button type="submit" onClick={handle}>submit</button>
    </div>
    )
}
export default Dashboard