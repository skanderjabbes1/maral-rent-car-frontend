import React, { useState } from 'react';

const initialState = {
  brand: '',
  priceMin: '',
  priceMax: '',
  type: '',
  transmission: '',
  seats: '',
  fuelType: '',
  onlyAvailable: false,
};

// Main brands (ones you show in the dropdown)
const brands = [
  'Toyota', 'Kia', 'Hyundai', 'BMW', 'Audi', 'Mercedes', 'Dacia', 'Other'
];
const types = [
  'Sedan', 'SUV', 'Hatchback', 'Convertible', 'Pickup', 'Van'
];
const transmissions = [
  'Automatic', 'Manual'
];
const seatOptions = [2, 4, 5, 7, 8];
const fuelTypes = [
  'Petrol', 'Diesel', 'Hybrid', 'Electric'
];

const CarFilter = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState(initialState);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFilters(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onFiltersChange(filters);
  };

  const handleReset = () => {
    setFilters(initialState);
    onFiltersChange(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24, padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <select name="brand" value={filters.brand} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <option value="">All Brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
      
      <select name="type" value={filters.type} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      
      <select name="transmission" value={filters.transmission} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <option value="">Any Transmission</option>
        {transmissions.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      
      <select name="fuelType" value={filters.fuelType} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <option value="">Any Fuel</option>
        {fuelTypes.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      
      <select name="seats" value={filters.seats} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
        <option value="">Any Seats</option>
        {seatOptions.map(seat => (
          <option key={seat} value={seat}>{seat} seats</option>
        ))}
      </select>
      
      <input
        type="number"
        name="priceMin"
        value={filters.priceMin}
        onChange={handleChange}
        placeholder="Min Price"
        min="0"
        style={{ width: 100, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
      />
      
      <input
        type="number"
        name="priceMax"
        value={filters.priceMax}
        onChange={handleChange}
        placeholder="Max Price"
        min="0"
        style={{ width: 100, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
      />
      
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          name="onlyAvailable"
          checked={filters.onlyAvailable}
          onChange={handleChange}
        />
        Only Available
      </label>
      
      <button 
        type="submit" 
        style={{ 
          padding: '8px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Filter
      </button>
      
      <button 
        type="button" 
        onClick={handleReset}
        style={{ 
          padding: '8px 20px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default CarFilter;
