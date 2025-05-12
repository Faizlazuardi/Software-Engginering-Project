import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLogin from '../pages/Auth/CustomerLogin';
import CustomerRegister from '../pages/Auth/CustomerRegister';
import POSLogin from '../pages/Auth/POSLogin';
import POSHome from '../pages/POS/Home/HomePage';
import POSManagementOverview from '../pages/POS/Management/Overview';
import POSManagementProduct from '../pages/POS/Management/Products';
import POSManagementTransaction from '../pages/POS/Management/Transaction';
import POSManagementCustomer from '../pages/POS/Management/Customers';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/pos" element={<POSHome />} />
        <Route path="/pos/login" element={<POSLogin />} />
        <Route path="/pos/management/overview" element={<POSManagementOverview />} />
        <Route path="/pos/management/product" element={<POSManagementProduct />} />
        <Route path="/pos/management/transaction" element={<POSManagementTransaction />} />
        <Route path="/pos/management/customer" element={<POSManagementCustomer />} />
      </Routes>
    </Router>
  );
}