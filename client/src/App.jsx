import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerSignIn from '../src/pages/Auth/CustomerSignIn';
import CustomerSignUp from '../src/pages/Auth/CustomerSignUp';
import POSLogin from '../src/pages/Auth/POSLogin';
import POSHome from '../src/pages/POS/Home/HomePage';
import POSManagementOverview from '../src/pages/POS/Management/Overview';
import POSManagementProduct from '../src/pages/POS/Management/Products';
import POSManagementTransaction from '../src/pages/POS/Management/Transaction';
import POSManagementCustomer from '../src/pages/POS/Management/Customers';
import CustomerDisplaySummary from '../src/pages/CustomerDisplay/Summary';
import CustomerDisplayPayment from '../src/pages/CustomerDisplay/Payment';

import { CartProvider } from "../src/contexts/cartContext";
import { AuthProvider } from "../src/contexts/authContext";
import ProtectedRoute from "../src/components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<CustomerSignIn />} />
            <Route path="/register" element={<CustomerSignUp />} />
            <Route path="/pos/login" element={<POSLogin />} />
            
            {/* Protected POS Routes (Admin Only) */}
            <Route path="/pos" element={
              <ProtectedRoute requireAdmin={true}>
                <POSHome />
              </ProtectedRoute>
            } />
            
            <Route path="/pos/management/overview" element={
              <ProtectedRoute requireAdmin={true}>
                <POSManagementOverview />
              </ProtectedRoute>
            } />
            
            <Route path="/pos/management/product" element={
              <ProtectedRoute requireAdmin={true}>
                <POSManagementProduct />
              </ProtectedRoute>
            } />
            
            <Route path="/pos/management/transaction" element={
              <ProtectedRoute requireAdmin={true}>
                <POSManagementTransaction />
              </ProtectedRoute>
            } />
            
            <Route path="/pos/management/customer" element={
              <ProtectedRoute requireAdmin={true}>
                <POSManagementCustomer />
              </ProtectedRoute>
            } />
            
            {/* Customer Display Routes */}
            <Route path="/customer-display/summary" element={<CustomerDisplaySummary />} />
            <Route path="/customer-display/payment" element={<CustomerDisplayPayment />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}