import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import DashboardGraph from '../components/dashboard/DashboardGraph';

const DashboardPage = () => {
  const dispatch = useDispatch();
  // We still select the products from the state as before
  const { items: products, loading, error } = useSelector((state) => state.products);

  // --- THIS IS THE CORRECTED LOGIC ---
  useEffect(() => {
    // Only fetch products if the list in our Redux store is empty.
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    // We add products.length to the dependency array
    // so the effect can re-run if the products are cleared for some reason.
  }, [dispatch, products.length]);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading && <p>Loading graph data...</p>}
      {error && <p style={{ color: 'red' }}>Error loading data: {error.message}</p>}
      {!loading && !error && products.length > 0 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <DashboardGraph products={products} />
        </div>
      )}
       {!loading && !error && products.length === 0 && (
        <p>No product data to display.</p>
      )}
    </div>
  );
};

export default DashboardPage;