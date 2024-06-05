import React, { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "../../components/Footer/Footer";
import Avatar from "../../components/Avatar";
import { jwtDecode } from "jwt-decode";
import CustomModal from "../../components/CustomModal/CustomModal";
import { toast } from "react-toastify";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ClientProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [adresse, setadresse] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setadresse(response.data.adresse);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleEditUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('adresse', adresse);
  
      if (image) {
        formData.append('image', image);
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      await axios.put(`http://localhost:3001/users/${userId}`, formData, config);
      setIsEditModalOpen(false);
      toast.success('modifié avec succès!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Échec de la modification');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      
      await axios.put(`http://localhost:3001/users/updatePassword/${userId}`, { password, newPassword });
      
      setIsPasswordModalOpen(false);
      toast.success('Mot de passe modifié avec succès !');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Échec de la modification du mot de passe.');
    }
};

const handleLogout = () => {
  localStorage.clear();
  navigate("/", { replace: true });
};

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      await axios.delete(`http://localhost:3001/users/${userId}`);
      alert('Utilisateur supprimé avec succès!');
      handleLogout();
      // Add logout logic here
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={styles.pageContainer}>
        <div style={styles.accountPage}>
          <div style={styles.accountSidebar}>
            <h2 style={styles.sidebarTitle}>Votre Account</h2>
            <ul style={styles.sidebarList}>
              <li><a href="#profile" style={styles.sidebarLink}>Profile</a></li>
              <li><a href="#password" style={styles.sidebarLink} onClick={() => setIsPasswordModalOpen(true)}>Changer Password</a></li>
              <li><a href="#delete-account" style={styles.sidebarLink} onClick={handleDeleteUser}>Supprimer Account</a></li>
            </ul>
          </div>
          <div style={styles.accountContent}>
            <div style={styles.accountHeader}>
              <h2>Account</h2>
              <button style={styles.editButton} onClick={() => setIsEditModalOpen(true)}>Modifier</button>
            </div>
            <div style={styles.accountInfo}>
              <div style={styles.accountAvatar}>
                <Avatar style={styles.avatarImage} />
              </div>
              <div style={styles.accountDetails}>
                <p><FaRegUser />  {user.username}</p>
                <p><MdOutlineMail />  {user.email}</p>
                <p><MdOutlineLocationOn />  {user.adresse}</p>
              </div>
            </div>
            <button style={styles.logoutButton} onClick={handleLogout}>Se Déconnecter</button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Edit User Modal */}
      <CustomModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Modifier vos informations">
        <div className="add-user-form">
          <label>Username:</label><br/>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
          <label>Adresse:</label><br/>
          <input type="text" value={adresse} onChange={(e) => setadresse(e.target.value)} /><br/>
          <div>
          <label className="form-label">Photo actuelle:</label>
          <img src={`http://localhost:3001/${user?.image}`} alt="photo" className="current-image" />
        </div>
        <div>
          <label className="form-label">Nouvelle photo:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input"
          />
        </div><br/>
          <button className="button" onClick={handleEditUser}>Modifier</button>
        </div>
      </CustomModal>

      {/* Change Password Modal */}
      <CustomModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Change Password">
  <form onSubmit={handleChangePassword}>
    <div>
      <label>Mot de passe actuel:</label><br/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
      <label>Nouveau mot de passe:</label><br/>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /><br/>
      <button className="button" type="submit">Changer mot de passe</button>
    </div>
  </form>
</CustomModal>
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
    width: '50px',
    height: '50px',
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