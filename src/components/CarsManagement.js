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
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem('token');

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCars(response.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load cars');
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.brand.trim() ||
      !formData.model.trim() ||
      !formData.year ||
      !formData.type.trim() ||
      !formData.pricePerDay ||
      !formData.fuelType.trim() ||
      !formData.mileage ||
      !formData.transmission.trim()
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let imageUrl = formData.imageUrl || '';

      // If a new file is selected, upload it and get the URL
      if (imageFile) {
        const imgForm = new FormData();
        imgForm.append('image', imageFile);

        const uploadRes = await axios.post(
          'http://localhost:5000/api/cars/upload-image',
          imgForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      const data = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: parseInt(formData.year),
        type: formData.type.trim(),
        pricePerDay: parseFloat(formData.pricePerDay),
        fuelType: formData.fuelType.trim(),
        mileage: parseInt(formData.mileage),
        transmission: formData.transmission.trim(),
        features: formData.features
          ? formData.features.split(',').map(f => f.trim()).filter(f => f)
          : [],
        color: formData.color.trim(),
        imageUrl: imageUrl,
        seatCount: parseInt(formData.seatCount) || 0,
        isAvailable: !!formData.isAvailable,
      };

      console.log('Submitting car data:', data);

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

      setShowForm(false);
      setEditingCar(null);
      setImageFile(null);
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
        isAvailable: true,
      });
      fetchCars();
    } catch (err) {
      console.error('Error saving car', err);
      alert('Error saving car: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setImageFile(null);
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || '',
      type: car.type || '',
      pricePerDay: car.pricePerDay || '',
      fuelType: car.fuelType || '',
      mileage: car.mileage || '',
      transmission: car.transmission || '',
      features: (car.features || []).join(', '),
      color: car.color || '',
      imageUrl: car.imageUrl || '',
      seatCount: car.seatCount || '',
      isAvailable: car.isAvailable !== false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Car deleted successfully!');
      fetchCars();
    } catch (err) {
      console.error('Error deleting car', err);
      alert('Error deleting car: ' + err.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCar(null);
    setImageFile(null);
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
      isAvailable: true,
    });
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Cars Management</h2>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditingCar(null);
            setImageFile(null);
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
              isAvailable: true,
            });
          }}
        >
          <FaPlus /> Add New Car
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && (
        <div className="car-form">
          <h3>{editingCar ? 'Edit Car' : 'Add Car'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="brand"
                placeholder="Brand (e.g. Toyota)"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model (e.g. Corolla)"
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
              <input
                type="text"
                name="type"
                placeholder="Type (e.g. Economy, SUV, Compact)"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="pricePerDay"
                placeholder="Price per day (TND)"
                value={formData.pricePerDay}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="fuelType"
                placeholder="Fuel Type (e.g. Petrol, Diesel)"
                value={formData.fuelType}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="mileage"
                placeholder="Mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="transmission"
                placeholder="Transmission (e.g. Automatic, Manual)"
                value={formData.transmission}
                onChange={handleInputChange}
                required
              />
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
              <select
                name="isAvailable"
                value={formData.isAvailable ? 'available' : 'booked'}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    isAvailable: e.target.value === 'available',
                  }))
                }
              >
                <option value="available">Status: Available</option>
                <option value="booked">Status: Booked / Unavailable</option>
              </select>

              {/* Current image preview when editing */}
              {editingCar && formData.imageUrl && (
                <div style={{ gridColumn: '1 / -1', marginBottom: '10px' }}>
                  <label
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      marginBottom: '4px',
                      display: 'block',
                    }}
                  >
                    Current Image
                  </label>
                  <img
                    src={formData.imageUrl}
                    alt="Car"
                    style={{
                      width: '160px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                    }}
                  />
                </div>
              )}

              {/* File upload field */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    marginBottom: '4px',
                    display: 'block',
                  }}
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(
                      e.target.files && e.target.files[0] ? e.target.files[0] : null
                    )
                  }
                />
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  Choose an image file from your computer. The file will be uploaded and stored
                  securely on the server.
                </div>
              </div>

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
        {loading ? (
          <p>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Brand / Model</th>
                <th>Type</th>
                <th>Year</th>
                <th>Price/Day</th>
                <th>Fuel</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car.brand} {car.model}</td>
                  <td>{car.type}</td>
                  <td>{car.year}</td>
                  <td>{car.pricePerDay} TND</td>
                  <td>{car.fuelType}</td>
                  <td>{car.seatCount || '-'}</td>
                  <td>{car.isAvailable ? 'Available' : 'Booked'}</td>
                  <td>
                    {car.imageUrl ? (
                      <img
                        src={car.imageUrl}
                        alt={car.model}
                        style={{
                          width: '80px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>No image</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(car)}
                      style={{ marginRight: '8px' }}
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}