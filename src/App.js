import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import PrivateRoute from './routing/PrivateRoute';
import { useSelector } from 'react-redux';
import Header from './components/common/Header'; 

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      
      {token && <Header />}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
          />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;