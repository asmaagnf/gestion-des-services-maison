
import React, { useState } from "react";
import "../../components/Header/Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";

const ClientInterface = () => {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  
  return (
    
   
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
            <NavLink to="/allservices">Services</NavLink>
            <button
            className="button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
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
  );
};

export default ClientInterface


