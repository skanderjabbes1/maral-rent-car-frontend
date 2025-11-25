import React from 'react';
import './CarFilter.css';

const DEFAULT_FILTERS = {
  vehicleType: 'all',
  transmission: 'all',
  seats: 'all',
  priceRange: 'all',
  availability: 'all',
};

const vehicleTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Economy', label: 'Economy' },
  { value: 'Compact', label: 'Compact' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Van', label: 'Van' },
];

const transmissions = [
  { value: 'all', label: 'All' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
];

const seatsOptions = [
  { value: 'all', label: 'All' },
  { value: '2', label: '2 seats' },
  { value: '4', label: '4 seats' },
  { value: '5', label: '5 seats' },
  { value: '7', label: '7 seats' },
  { value: '9', label: '9 seats' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: 'lt80', label: '< 80 TND' },
  { value: '80-100', label: '80 - 100 TND' },
  { value: '100-130', label: '100 - 130 TND' },
  { value: 'gt130', label: '> 130 TND' },
];

const availabilities = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'booked', label: 'Booked' },
];

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'status', label: 'Availability' },
];

const CarFilter = ({
  filters = DEFAULT_FILTERS,
  onFiltersChange,
  sortOption = 'name',
  onSortChange,
}) => {
  const current = { ...DEFAULT_FILTERS, ...filters };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const next = { ...current, [name]: value };
    if (onFiltersChange) onFiltersChange(next);
  };

  const handleSortChange = (e) => {
    if (onSortChange) onSortChange(e.target.value);
  };

  const handleReset = () => {
    if (onFiltersChange) onFiltersChange(DEFAULT_FILTERS);
    if (onSortChange) onSortChange('name');
  };

  return (
    <div className="fleet-filters-row">
      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Vehicle Type</span>
        <select
          name="vehicleType"
          className="fleet-filter-select"
          value={current.vehicleType}
          onChange={handleFilterChange}
        >
          {vehicleTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Transmission</span>
        <select
          name="transmission"
          className="fleet-filter-select"
          value={current.transmission}
          onChange={handleFilterChange}
        >
          {transmissions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Seats</span>
        <select
          name="seats"
          className="fleet-filter-select"
          value={current.seats}
          onChange={handleFilterChange}
        >
          {seatsOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Price Range</span>
        <select
          name="priceRange"
          className="fleet-filter-select"
          value={current.priceRange}
          onChange={handleFilterChange}
        >
          {priceRanges.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Availability</span>
        <select
          name="availability"
          className="fleet-filter-select"
          value={current.availability}
          onChange={handleFilterChange}
        >
          {availabilities.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="fleet-filter-field">
        <span className="fleet-filter-label">Sort By</span>
        <select
          name="sort"
          className="fleet-filter-select"
          value={sortOption}
          onChange={handleSortChange}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="fleet-filter-reset-btn"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default CarFilter;