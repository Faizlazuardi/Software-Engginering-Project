import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/CustomerLogin';
import Register from '../pages/Auth/CustomerRegister';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}