import React from "react";
import "./Footer.css";
import AddReclamation from "../AddReclamation/AddReclamation";

// Import social media icons from Material-UI
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="../../public/logo2.png" alt="Logo" width={120} />
          <span className="secondaryText">
            © Maroc 2024
          </span>
        </div>
        
        {/* center side */}
        <div className="flexColStart">
          <span className="primaryText">Information</span>
          <span className="secondaryText">145 Casablanca, Maroc</span>
          <div className="flexCenter f-menu">
            <div className="f-menu-column">
              <span>Services</span>
              <span>Privacy Policy</span>
            </div>
            <div className="f-menu-column">
              <span>Terms of Use</span>
              <span>About Us</span>
            </div>
          </div>
        </div>

        {/* right side (combined Follow Us and Contact Us) */}
        <div className="flexColStart ">
          <div className="flexColStart f-follow-contact">
            
            <span className="primaryText">Contact Us</span>
            <span className="se">Email : contact@homyz.com</span>
            <span className="se">Phone : 0522009112</span>
          </div>
           </div>
           <div className="flexColStart f-right">
           <span className="primaryText">Follow Us</span>
            <div className="flexCenter f-socials ">
              <a href="#"><FacebookIcon style={{ color: 'Blue', fontSize: 24 }} /></a>
              <a href="#"><TwitterIcon style={{ color: 'Blue', fontSize: 24 }} /></a>
              <a href="#"><InstagramIcon style={{ color: 'Tomato', fontSize: 24 }} /></a>
            </div>
            </div>
        
      </div>
    </div>
  );
};

export default Footer;
