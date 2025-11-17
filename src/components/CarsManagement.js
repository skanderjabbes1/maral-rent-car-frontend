import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function CarsManagement() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    type: '',
    pricePerDay: '',
    fuelType: '',
    mileage: '',
    transmission: '',
    features: '',
    color: '',
    imageUrl: '',
    seatCount: '',
  });

  const token = localStorage.getItem('token');

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.type ||
      !formData.pricePerDay ||
      !formData.fuelType ||
      !formData.mileage ||
      !formData.transmission
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const data = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        type: formData.type.trim(), // CRITICAL: must be 'type'
        pricePerDay: parseFloat(formData.pricePerDay),
        fuelType: formData.fuelType.trim(),
        mileage: parseInt(formData.mileage),
        transmission: formData.transmission.trim(),
        features: formData.features
          ? formData.features.split(',').map(f => f.trim()).filter(f => f)
          : [],
        color: formData.color.trim(),
        imageUrl: formData.imageUrl.trim(),
        seatCount: parseInt(formData.seatCount) || 0,
        // Backend sets isAvailable/createdAt automatically
      };

      console.log('Submitting data:', data); // Debug: See what is sent

      if (editingCar) {
        await axios.put(`http://localhost:5000/api/cars/${editingCar._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Car updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/cars', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Car added successfully!');
      }

      setFormData({
        brand: '',
        model: '',
        year: '',
        type: '',
        pricePerDay: '',
        fuelType: '',
        mileage: '',
        transmission: '',
        features: '',
        color: '',
        imageUrl: '',
        seatCount: '',
      });
      setShowForm(false);
      setEditingCar(null);
      fetchCars();
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      type: car.type,
      pricePerDay: car.pricePerDay,
      fuelType: car.fuelType,
      mileage: car.mileage,
      transmission: car.transmission,
      features: car.features.join(', '),
      color: car.color,
      imageUrl: car.imageUrl,
      seatCount: car.seatCount,
    });
    setShowForm(true);
  };

  const handleDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Car deleted successfully!');
      fetchCars();
    } catch (err) {
      alert('Error deleting car: ' + err.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCar(null);
    setFormData({
      brand: '',
      model: '',
      year: '',
      type: '',
      pricePerDay: '',
      fuelType: '',
      mileage: '',
      transmission: '',
      features: '',
      color: '',
      imageUrl: '',
      seatCount: '',
    });
  };

  if (loading) return (
    <div className="admin-section"><p>Loading cars...</p></div>
  );

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Cars Management</h2>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus size={16} /> {showForm ? 'Cancel' : 'Add New Car'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && (
        <div className="form-container">
          <h3>{editingCar ? 'Edit Car' : 'Add New Car'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Van">Van</option>
                <option value="Pickup">Pickup</option>
                <option value="Convertible">Convertible</option>
              </select>
              <input
                type="number"
                name="pricePerDay"
                placeholder="Price Per Day (TND)"
                value={formData.pricePerDay}
                onChange={handleInputChange}
                required
              />
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
              <input
                type="number"
                name="mileage"
                placeholder="Mileage (km)"
                value={formData.mileage}
                onChange={handleInputChange}
                required
              />
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="seatCount"
                placeholder="Number of Seats"
                value={formData.seatCount}
                onChange={handleInputChange}
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
              <textarea
                name="features"
                placeholder="Features (comma-separated: GPS, Air Conditioning, Bluetooth)"
                value={formData.features}
                onChange={handleInputChange}
                style={{ gridColumn: '1 / -1' }}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-success">
                {editingCar ? 'Update Car' : 'Add Car'}
              </button>
              <button type="button" className="btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cars-table">
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Type</th>
              <th>Price/Day</th>
              <th>Color</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No cars found
                </td>
              </tr>
            ) : (
              cars.map(car => (
                <tr key={car._id}>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.type}</td>
                  <td>{car.pricePerDay} TND</td>
                  <td>{car.color}</td>
                  <td>{car.seatCount}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(car)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(car._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}