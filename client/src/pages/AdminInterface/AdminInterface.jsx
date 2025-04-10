import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInterface.css';
import HeaderAdmin from './../../components/HeaderAdmin/HeaderAdmin';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import CustomModal from '../../components/CustomModal/CustomModal';

const AdminInterface = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); 
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [selectedRole, setSelectedRole] = useState('all');
  const [modalOpened, setModalOpened] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    getOnlineUsersCount();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, selectedRole, searchName, searchEmail]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    let filtered = users.filter(user => {
      return (
        (selectedRole === 'all' || user.role === selectedRole) &&
        user.username.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  };

  const getOnlineUsersCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/online/count');
      setOnlineUsersCount(response.data.count);
    } catch (error) {
      console.error('Error fetching online users count:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3001/users/adduser', { username, email, password, role });
      fetchUsers();
      getOnlineUsersCount();
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('client'); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      fetchUsers();
      getOnlineUsersCount();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEditModal = (user) => {
    setUserToEdit(user);
    setModalOpened(true);
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${userToEdit.id}`, {
        username: userToEdit.username,
        email: userToEdit.email,
        role: userToEdit.role,
        image: userToEdit.image
      });
      fetchUsers();
      getOnlineUsersCount();
      setModalOpened(false);
      setUserToEdit(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="paddings">
        <h2 className='orangeText'>Gestion des utilisateurs</h2>
        <div className="grid">
        <a href="#users"><div className="grid__item">
          <h2 className="grid__title ">Nombre total d'utilisateurs </h2>
          <h3 className="grid__count ">{users.length}</h3>
           
          </div></a>
          <div className="grid__item">
            <h2 className="grid__title">Utilisateurs en ligne </h2>
            <h3 className="grid__count">{onlineUsersCount}</h3>
          </div>
        </div>

        <div>
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter un utilisateur">
        <div className="add-user-form">
        <label>Nom d'utilisateur:</label><br/>
          <input
            type="text"
            placeholder="Nom d'ultilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <label>Email:</label><br/>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <label>Role:</label><br/>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="pro">Professional</option>
            <option value="admin">Admin</option>
          </select><br/>
          <label>Password:</label><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <button className="button" onClick={addUser}>Ajouter</button>
        </div>
      </CustomModal>
    </div>
        <div className="filter-buttons">
          <h3>Filtrer par rôle:</h3>
          <button onClick={() => setSelectedRole('all')}>All</button>
          <button onClick={() => setSelectedRole('client')}>Client</button>
          <button onClick={() => setSelectedRole('pro')}>Professional</button>
          <button onClick={() => setSelectedRole('admin')}>Admin</button>
        </div>
        <div className="search-section">
          <h3>Rechercher par nom ou par e-mail :</h3>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button onClick={filterUsers}>Recherche</button>
        </div>
        <button className="button" onClick={() => setIsModalOpen(true)}>
        Ajouter un utilisateur
      </button>
        <table className="user-table" id='users'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date de création</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="action-buttons">

                <FaEdit  className='modifier' onClick={() => openEditModal(user)}/>
                <RiDeleteBin5Line className='supprimer' onClick={() => deleteUser(user.id)}/>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomModal
          isOpen={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Modifier utilisateur"
        >
          {userToEdit && (
            <div className="add-user-form">
              <label>
                Nom d'utilisateur:<br/>
                <input
                  type="text"
                  value={userToEdit.username}
                  onChange={(e) => setUserToEdit({ ...userToEdit, username: e.target.value })}
                />
              </label><br/>
              <label>
                Email:<br/>
                <input
                  type="email"
                  value={userToEdit.email}
                  onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                />
              </label><br/>
              <label>
                Role:<br/>
                <select
                  value={userToEdit.role}
                  onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
                >
                  <option value="client">Client</option>
                  <option value="pro">Professional</option>
                  <option value="admin">Admin</option>
                </select>
              </label><br/>
              <label>
                Image URL<br/>
                <input
                  type="text"
                  value={userToEdit.image}
                  onChange={(e) => setUserToEdit({ ...userToEdit, image: e.target.value })}
                />
              </label><br/>
              <button className="button" onClick={updateUser}>Modifier</button>
            </div>
          )}
        </CustomModal>
      </div>
    </div>
  );
};

export default AdminInterface;