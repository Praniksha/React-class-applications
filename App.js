import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([
   
  ]);

  const [newUser, setNewUser] = useState({ name: '', age: '', occupation: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    const isUserUnique = users.every(
      (user) => user.name !== newUser.name || user.age !== newUser.age
    );

    if (!newUser.name || !newUser.age || !newUser.occupation) {
      alert('Please fill in all fields.');
    } else if (!isUserUnique) {
      alert('This user already exists.');
    } else {
      const user = {
        id: users.length + 1,
        ...newUser
      };
      setUsers([...users, user]);
      setNewUser({ name: '', age: '', occupation: '' });
    }
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1>User Profiles</h1>

      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Age:</strong> {user.age}</div>
              <div><strong>Occupation:</strong> {user.occupation}</div>
              <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <form className="user-form" onSubmit={(e) => { e.preventDefault(); addUser(); }}>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} required />
        <input type="number" name="age" placeholder="Age" value={newUser.age} onChange={handleInputChange} required />
        <input type="text" name="occupation" placeholder="Occupation" value={newUser.occupation} onChange={handleInputChange} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
