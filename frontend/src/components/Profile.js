// src/components/Profile.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    // Redirect to sign-in if accessed without login
    navigate('/');
  }

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Favorite Food:</strong> {user.favorite_food}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
