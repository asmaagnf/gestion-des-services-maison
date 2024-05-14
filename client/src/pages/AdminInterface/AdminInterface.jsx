import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInterface.css'; 
import HeaderAdmin from './../../components/HeaderAdmin/HeaderAdmin';
const AdminInterface = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    fetchUsers();
    getOnlineUsersCount();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, selectedRole, searchName, searchEmail]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
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
      const response = await axios.get('http://localhost:3001/api/users/online/count');
      setOnlineUsersCount(response.data.count);
    } catch (error) {
      console.error('Error fetching online users count:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/adduser', { username, email, password, role });
      fetchUsers();
      getOnlineUsersCount();
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      fetchUsers();
      getOnlineUsersCount();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      const newUsername = prompt('Enter new username:', userToUpdate.username);
      const newEmail = prompt('Enter new email:', userToUpdate.email);
      const newRole = prompt('Enter new role:', userToUpdate.role);
      const newImage = prompt('Enter new image URL:', userToUpdate.image);

      await axios.put(`http://localhost:3001/api/users/${userId}`, {
        username: newUsername,
        email: newEmail,
        role: newRole,
        image: newImage
      });
      fetchUsers();
      getOnlineUsersCount();
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
            <div className="grid__item">
            <a href="#users"><h2 className="grid__title ">Nombre total d'utilisateurs </h2></a>
              <h3 className="grid__count ">{users.length}</h3>
            </div>
            <div className="grid__item">
              <h2 className="grid__title">Utilisateurs en ligne </h2>
              <h3 className="grid__count">{onlineUsersCount}</h3>
            </div>
            </div>



    <div className="add-user-form">
      <h3>Ajouter un utilisateur</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
         <input
        type="text"
        placeholder="client/pro/admin"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={addUser}>Ajouter</button>
    </div>
    <div className="filter-buttons">
      <h3>Filtrer par rôle:</h3>
      <button onClick={() => setSelectedRole('all')}>All</button>
      <button onClick={() => setSelectedRole('client')}>Client</button>
      <button onClick={() => setSelectedRole('pro')}>Professional</button>
      <button onClick={() => setSelectedRole('admin')}>Admin</button>
    </div>
    <div className="search-section">
      <h3>Rechercher par nom ou par e-mail :</h3>
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
              <button className='modifier' onClick={() => updateUser(user.id)}>Modifier</button>
              <button className='supprimer' onClick={() => deleteUser(user.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
);
};

export default AdminInterface;
