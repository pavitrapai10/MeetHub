import React from "react";
import './home.css' ;
import MapContainer from "../components/GoogleMap";



const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to MeetHub</h1>
            <p>OneStop Solution for meeting halfway
            </p>
            <div className="MapContainer">
            <MapContainer/>
            </div>
        </div>
        );
}

export default Home;

