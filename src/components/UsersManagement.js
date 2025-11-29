import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    password: '',
  });

  const token = localStorage.getItem('token');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data || []);
    } catch (err) {
      console.error('Failed to load users', err);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openAddForm = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      password: '',
    });
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'user',
      password: '', // we don't show existing password; admin can set a new one
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Name and email are required.');
      return;
    }

    try {
      if (editingUser) {
        // UPDATE user (optionally with new password)
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        };

        if (formData.password && formData.password.trim().length > 0) {
          if (formData.password.length < 6) {
            setError('New password must be at least 6 characters.');
            return;
          }
          payload.password = formData.password;
        }

        await axios.patch(
          `http://localhost:5000/api/users/${editingUser._id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // CREATE user (password required)
        if (!formData.password || formData.password.length < 6) {
          setError('Password must be at least 6 characters for new users.');
          return;
        }

        await axios.post(
          'http://localhost:5000/api/users',
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setShowForm(false);
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        password: '',
      });
      fetchUsers();
    } catch (err) {
      console.error('Error saving user', err);
      const msg = err.response?.data?.error || 'Failed to save user.';
      setError(msg);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setError('');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user', err);
      const msg = err.response?.data?.error || 'Failed to delete user.';
      setError(msg);
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <p>Loading users...</p>
      </div>
    );
  }

  // Simple client-side search by name, email, or phone
  const filteredUsers = users.filter((user) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (user.name && user.name.toLowerCase().includes(q)) ||
      (user.email && user.email.toLowerCase().includes(q)) ||
      (user.phone && user.phone.toLowerCase().includes(q))
    );
  });

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Users Management</h2>
        <button className="btn-primary" onClick={openAddForm}>
          Add New User
        </button>
      </div>

      {/* Search bar */}
      <div className="admin-search" style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '320px',
            padding: '8px 10px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
          }}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && (
        <div className="car-form">
          <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {/* Password: required for new user, optional when editing */}
              <input
                type="password"
                name="password"
                placeholder={
                  editingUser
                    ? 'New password (optional, min 6 chars)'
                    : 'Password (min 6 chars)'
                }
                value={formData.password}
                onChange={handleFormChange}
                required={!editingUser}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-success">
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  setShowForm(false);
                  setEditingUser(null);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    role: 'user',
                    password: '',
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => openEditForm(user)}
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}