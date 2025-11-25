import React, { useEffect, useMemo, useState } from 'react';
import { getCars } from '../api';
import CarCard from './CarCard';
import CarFilter from './CarFilter';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    vehicleType: 'all',
    transmission: 'all',
    seats: 'all',
    priceRange: 'all',
    availability: 'all',
  });
  const [sortOption, setSortOption] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load cars once
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars({});
        setCars(Array.isArray(data) ? data : []);
        setError('');
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load vehicles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (!car) return false;

      // Vehicle type (category)
      if (filters.vehicleType !== 'all') {
        if (!car.type || car.type.toLowerCase() !== filters.vehicleType.toLowerCase()) {
          return false;
        }
      }

      // Transmission
      if (filters.transmission !== 'all') {
        if (!car.transmission || car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) {
          return false;
        }
      }

      // Seats
      if (filters.seats !== 'all') {
        const seatCount = Number(car.seatCount || car.seats);
        if (seatCount !== Number(filters.seats)) return false;
      }

      // Price range
      if (filters.priceRange !== 'all') {
        const price = Number(car.pricePerDay || 0);
        if (filters.priceRange === 'lt80' && !(price < 80)) return false;
        if (filters.priceRange === '80-100' && !(price >= 80 && price <= 100)) return false;
        if (filters.priceRange === '100-130' && !(price > 100 && price <= 130)) return false;
        if (filters.priceRange === 'gt130' && !(price > 130)) return false;
      }

      // Availability
      if (filters.availability !== 'all') {
        const available = car.isAvailable !== false; // treat undefined as available
        if (filters.availability === 'available' && !available) return false;
        if (filters.availability === 'booked' && available) return false;
      }

      return true;
    });
  }, [cars, filters]);

  // Sort
  const sortedCars = useMemo(() => {
    const list = [...filteredCars];

    switch (sortOption) {
      case 'name':
        list.sort((a, b) => {
          const nameA = `${a.brand || ''} ${a.model || ''}`.toLowerCase();
          const nameB = `${b.brand || ''} ${b.model || ''}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
      case 'price-asc':
        list.sort(
          (a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0)
        );
        break;
      case 'price-desc':
        list.sort(
          (a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0)
        );
        break;
      case 'status':
        list.sort((a, b) => {
          const avA = a.isAvailable !== false ? 0 : 1;
          const avB = b.isAvailable !== false ? 0 : 1;
          return avA - avB;
        });
        break;
      default:
        break;
    }

    return list;
  }, [filteredCars, sortOption]);

  const visibleCount = sortedCars.length;
  const totalCount = cars.length;

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <div className="fleet-page">
      <div className="fleet-container">
        {/* Top filter bar card */}
        <div className="fleet-filters-card">
          <CarFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />

          <div className="fleet-filters-divider" />

          <div className="fleet-filters-footer">
            <span className="fleet-filters-count">
              Showing {visibleCount} of {totalCount} vehicles
            </span>
          </div>
        </div>

        {/* Content / grid */}
        {loading && (
          <div className="fleet-state fleet-state--info">
            Loading vehicles...
          </div>
        )}

        {error && !loading && (
          <div className="fleet-state fleet-state--error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {sortedCars.length === 0 ? (
              <div className="fleet-state fleet-state--empty">
                <h3>No vehicles found</h3>
                <p>Try changing the filters or price range.</p>
              </div>
            ) : (
              <div className="fleet-grid">
                {sortedCars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarList;