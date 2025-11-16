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

const CarFilter = ({ onFilter }) => {
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
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters(initialState);
    onFilter(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
      <select name="brand" value={filters.brand} onChange={handleChange}>
        <option value="">All Brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select name="transmission" value={filters.transmission} onChange={handleChange}>
        <option value="">Any Transmission</option>
        {transmissions.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select name="fuelType" value={filters.fuelType} onChange={handleChange}>
        <option value="">Any Fuel</option>
        {fuelTypes.map(f => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      <select name="seats" value={filters.seats} onChange={handleChange}>
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
        style={{ width: 100 }}
      />
      <input
        type="number"
        name="priceMax"
        value={filters.priceMax}
        onChange={handleChange}
        placeholder="Max Price"
        min="0"
        style={{ width: 100 }}
      />
      <label>
        <input
          type="checkbox"
          name="onlyAvailable"
          checked={filters.onlyAvailable}
          onChange={handleChange}
        />
        Only show available
      </label>
      <button type="submit">Filter</button>
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default CarFilter;