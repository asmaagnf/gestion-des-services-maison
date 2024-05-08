
import React, { useState,useEffect } from "react";
import "../../components/Header/Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Dashlayout = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      // Assuming user ID is stored in the token
      const userId = decodedToken.id;
      
      // Fetch user info using the user ID
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
    <>
    <section className="h-wrapper" style={{ background: 'black' }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
        <img src="./logo.png" alt="logo" width={100} />
        </Link>
        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/pro-interface/Ajouter-Service">ajouter un service</NavLink>
            <button
            className="button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
          {userInfo && (
                  <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
                    <span className="text-5xl text-white">
                    {userInfo.email[0].toUpperCase()}
                    </span>
                  </div> )}
          </div>
          
        </OutsideClickHandler>
      
        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
       
      </div>
       </section>
       <Outlet/>
       <Footer/>
       </>
   
  )
}

export default Dashlayout
