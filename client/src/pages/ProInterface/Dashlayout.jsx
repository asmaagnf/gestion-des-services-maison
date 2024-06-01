
import React, { useState,useEffect } from "react";
import "../../components/Header/Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Avatar from "../../components/Avatar";

const Dashlayout = () => {

  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <>
    <section className="h-wrapper" style={{ background: 'black' }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
        <img src="../../public/logo.png" alt="logo" width={100} />
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
            <NavLink to="/pro-interface/Ajouter-Service">Ajouter un service</NavLink>
            <NavLink to="/pro-interface/Demande">Gérer les demandes</NavLink>
            <NavLink to="/pro-interface/chat">Chat</NavLink>
            <NavLink to="/pro-interface/reclamation">Reclamation</NavLink>
            <NavLink to="/pro-interface/profile">Profile</NavLink>
            <button
            className="button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
          <Avatar/>
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
