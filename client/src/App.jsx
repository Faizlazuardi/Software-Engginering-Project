import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerSignIn from '../pages/Auth/CustomerSignIn';
import CustomerSignUp from '../pages/Auth/CustomerSignUp';
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
        <Route path="/login" element={<CustomerSignIn />} />
        <Route path="/register" element={<CustomerSignUp />} />
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