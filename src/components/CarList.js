import React, { useEffect, useState } from 'react';
import { getCars } from '../api';
import CarCard from './CarCard';
import CarFilter from './CarFilter'; // Import filter component


const mainBrands = ["Toyota", "Kia", "Hyundai", "BMW", "Audi", "Mercedes", "Dacia"];


function filterCars(cars, filters) {
  if (!cars || !Array.isArray(cars)) return []; // Safety check
  
  return cars.filter(car => {
    if (!car) return false; // Skip undefined cars
    
    // Brand and "Other" logic
    if (filters.brand) {
      if (filters.brand === "Other") {
        if (mainBrands.includes(car.brand)) return false;
      } else {
        if (car.brand !== filters.brand) return false;
      }
    }
    if (filters.type && car.type !== filters.type) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.seats && String(car.seatCount) !== String(filters.seats)) return false; // Changed from 'seats' to 'seatCount'
    if (filters.onlyAvailable && !car.isAvailable) return false; // Changed from 'available' to 'isAvailable'
    if (filters.priceMin && car.pricePerDay < +filters.priceMin) return false;
    if (filters.priceMax && car.pricePerDay > +filters.priceMax) return false;
    return true;
  });
}


const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await getCars({});
        setCars(carsData);
        setError('');
      } catch (err) {
        setError('Failed to load cars');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = filterCars(cars, filters);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Available Cars</h2>
      
      <CarFilter onFiltersChange={setFilters} />
      
      <div style={{ marginTop: '20px' }}>
        {filteredCars.length === 0 ? (
          <p>No cars found matching your filters.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default CarList;