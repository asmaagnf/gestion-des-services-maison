import React, { useState } from "react";
import "./HeaderAdmin.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate } from "react-router-dom";

const HeaderAdmin = ({ showServiceOption }) => {
  const navigate = useNavigate();
  const [menuOpened, setMenuOpened] = useState(false);
    const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
   

  return (
    <section className="h-wrap"  >
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
            
             <NavLink to="/admin-interface">les utilisateur</NavLink>
             <NavLink to="/admin-interface/listeservices">les services</NavLink>
             <NavLink to="/admin-interface/Reclamations">les reclamations</NavLink>
             <NavLink to="/admin-interface/Categorie">les categories</NavLink>
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

export default HeaderAdmin;
