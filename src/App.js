import React, { useState } from 'react';
import CarFilter from './components/CarFilter';
import CarList from './components/CarList';
import BookingHistory from './components/BookingHistory'; // <-- Add this import

function App() {
  const [filters, setFilters] = useState({});

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>Find Your Rental Car</h1>
      {/* Car search/filter/list */}
      <CarFilter onFilter={setFilters} />
      <CarList filters={filters} />
      {/* Add BookingHistory below or above as you prefer: */}
      <BookingHistory />
    </div>
  );
}

export default App;
