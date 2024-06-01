import React, { useState,useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { NavLink } from "react-router-dom";


const Avatar = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  return (
    <div>
      <NavLink to="/">
        {userInfo ? (
          userInfo.image ? (
            <img
              src={`http://localhost:3001/${userInfo.image}`}
              alt="User Avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
              <span className="text-5xl text-white">
                {userInfo.email[0].toUpperCase()}
              </span>
            </div>
          )
        ) : (
          <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
            <span className="text-5xl text-white">
              {/* Default content if userInfo is null */}
            </span>
          </div>
        )}
      </NavLink>
    </div>
  );
};


export default Avatar
