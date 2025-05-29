import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<CustomerSignIn />} />
          <Route path="/register" element={<CustomerSignUp />} />
          <Route path="/pos/login" element={<POSLogin />} />
          <Route path="/pos" element={<POSHome />} />
          <Route path="/customer-display/summary" element={<CustomerDisplaySummary />} />
          <Route path="/customer-display/payment" element={<CustomerDisplayPayment />} />
          <Route path="/pos/management/overview" element={<POSManagementOverview />} />
          <Route path="/pos/management/product" element={<POSManagementProduct />} />
          <Route path="/pos/management/transaction" element={<POSManagementTransaction />} />
          <Route path="/pos/management/customer" element={<POSManagementCustomer />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}