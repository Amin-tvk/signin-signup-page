// SubmitPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubmitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {}; // Use userData to match what's passed from Signup

  const handleSubmit = async () => {
    if (!userData) {
      alert("No user data to submit.");
      return;
    }
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(` ${apiUrl}/signup` ,  {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Headers':
          //'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          //'Access-Control-Allow-Methods': 'OPTIONS,POST',
          //'Access-Control-Allow-Credentials': true,
          //'Access-Control-Allow-Origin': '*',
          //'X-Requested-With': '*',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("User data submitted successfully!");
        navigate("/"); // Redirect to homepage or another page
      } else {
        alert(`Error submitting user data. ` , response.ok );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(`Error connecting to server. ${apiUrl}` );
    }
  };

  return (
    <div>
      <h2>Your Information</h2>
      {userData ? ( // Check if userData exists
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Password: {userData.password}</p>
          <p>Age: {userData.age}</p>
          <p>Favorite Food: {userData.favoriteFood}</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default SubmitPage;
