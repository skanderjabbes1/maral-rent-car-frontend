import React, { useEffect, useState } from 'react';
import { getCars } from '../api';
import CarCard from './CarCard';

const mainBrands = ["Toyota", "Kia", "Hyundai", "BMW", "Audi", "Mercedes", "Dacia"];

function filterCars(cars, filters) {
  return cars.filter(car => {
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
    if (filters.seats && String(car.seats) !== String(filters.seats)) return false;
    if (filters.onlyAvailable && !car.available) return false;
    if (filters.priceMin && car.pricePerDay < +filters.priceMin) return false;
    if (filters.priceMax && car.pricePerDay > +filters.priceMax) return false;
    return true;
  });
}

const CarList = ({ filters }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCars({}).then(setCars); // Fetch all cars, filter client-side
  }, []);

  const filteredCars = filterCars(cars, filters);

  return (
    <div>
      {filteredCars.length === 0 ? <p>No cars found.</p> : filteredCars.map(car => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
};

export default CarList;