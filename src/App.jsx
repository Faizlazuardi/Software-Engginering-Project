import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Customer/Home';
import Login from '../pages/Auth/CustomerLogin';
import Register from '../pages/Auth/CustomerRegister';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}