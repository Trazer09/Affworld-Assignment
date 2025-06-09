import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import PrivateRoute from './routing/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux'; // Make sure useDispatch is also imported
import { logout } from './features/auth/authSlice';

function App() {
  // --- START OF CHANGES ---

  // 1. Get the entire auth state object first.
  const authState = useSelector((state) => state.auth);

  // 2. Log the entire object to the console to see what's inside.
  console.log('App component is rendering. Full auth state:', authState);

  // 3. Safely get the token from the state object.
  const token = authState ? authState.token : null;

  // --- END OF CHANGES ---

  const dispatch = useDispatch();


  console.log('App component is rendering. Token is:', token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      {token && (
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
      <Routes>
        {/* If user is logged in, redirect from /login to /dashboard */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>

        {/* Redirect any other path to the dashboard or login */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;