import React from "react";
import Footer from "../../components/Footer/Footer";


const ClientProfile = () => {
  const handleLogout = () => {
    // Add your logout logic here
  };

  return (<div>
    <div style={styles.pageContainer}>
      
      <div style={styles.accountPage}>
        <div style={styles.accountSidebar}>
          <h2 style={styles.sidebarTitle}>Your Account</h2>
          <ul style={styles.sidebarList}>
            <li><a href="#profile" style={styles.sidebarLink}>Profile</a></li>
            <li><a href="#password" style={styles.sidebarLink}>Password</a></li>
            <li><a href="#business-info" style={styles.sidebarLink}>Business Information</a></li>
            <li><a href="#delete-account" style={styles.sidebarLink}>Delete Account</a></li>
          </ul>
        </div>
        <div style={styles.accountContent}>
          <div style={styles.accountHeader}>
            <h2>Account</h2>
            <button style={styles.editButton}>Edit</button>
          </div>
          <div style={styles.accountInfo}>
            <div style={styles.accountAvatar}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCIz7PI9hNldODpO5z1hDiagPJpLRzdatBRJ4WwELIw&s" alt="Avatar" style={styles.avatarImage} />
            </div>
            <div style={styles.accountDetails}>
              <p><i className="fas fa-user"></i> ayoub el mouden</p>
              <p><i className="fas fa-envelope"></i> ayoub.elmeo@gmail.com</p>
             
            </div>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  accountPage: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    width: '80%',
    maxWidth: '900px',
  },
  accountSidebar: {
    width: '200px',
    padding: '20px',
    borderRight: '1px solid #ccc',
  },
  sidebarTitle: {
    marginBottom: '20px',
  },
  sidebarList: {
    listStyle: 'none',
    padding: '0',
  },
  sidebarLink: {
    display: 'block',
    marginBottom: '10px',
    textDecoration: 'none',
    color: '#333',
  },
  accountContent: {
    flex: '1',
    padding: '20px',
  },
  accountHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  editButton: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  accountInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  accountAvatar: {
    marginRight: '20px',
  },
  avatarImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  accountDetails: {
    p: {
      margin: '5px 0',
    },
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  logoutButtonHover: {
    backgroundColor: '#ff1a1a',
  },
};

export default ClientProfile;
