import React, { useState } from "react";
import './invitePage.css';
import { useLocation , useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios for making API calls

const InvitePage = () => {
    const location = useLocation();
    const selectedPlaces = location.state?.selectedPlaces || [];
    const [selectedPlace, setSelectedPlace] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [description, setDescription] = useState("");  // New description state

    console.log(selectedPlaces, "----------------------------");
    const navigate = useNavigate(); 
    const handleInvite = () => {
        const data = {
            title,
            date,
            time,
            place: selectedPlace,
            description,  // Include description in the data payload
            phoneNumber: guests,  // Assuming guests contains phone number(s)
        };

   
        axios.post('http://localhost:5001/api/sms/send-sms', data)
        .then(response => {
            alert("Invitation sent successfully!");
            navigate('/home');  // Redirect to /home after successful invite
        })
        .catch(error => {
            console.error("Error sending invite:", error);
            alert("Failed to send the invitation.");
        });
};
    return (
        <div className="outer-container">
            <div className="Invite-page-main">
                <h1>Invite Guests</h1>
                <div className="content-wrapper">
                <div className="form-section">
                    <div className="form-group">
                        <label>Add Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time:</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location (Selected Place):</label>
                        <input
                            type="text"
                            value={selectedPlace || ""}
                            readOnly
                            placeholder="Select a place from the list"
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Guests (Phone Number):</label>
                        <input
                            type="text"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            placeholder="Add guests phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description:</label>  {/* New description input */}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            rows="3"
                        />
                    </div>

                    <button onClick={handleInvite} className="invite-button">Invite</button>
                </div>
{selectedPlaces.length > 0 && (
    <div className="places-list">
        <h2>Select a Location</h2>
        {selectedPlaces.map((place, index) => (
            <div
                key={index}
                className={`place-card ${selectedPlace === place.name ? "selected" : ""}`}
                onClick={() => setSelectedPlace(place.name)}
            >
                <h5>{place.name}</h5>
                <p>{place.vicinity}</p>
                <p>Rating: {place.rating || "N/A"}</p>
                {place.photos && place.photos.length > 0 && (
                    <img
                        src={place.photos[0].getUrl()}
                        alt={place.name}
                        style={{ width: "100px", height: "100px" }}
                    />
                )}
            </div>
        ))}
    </div>
)}
            </div>
            </div>
        </div>
    );
};

export default InvitePage;
