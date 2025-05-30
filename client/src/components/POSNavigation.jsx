import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function POSNavigation() {
    const [time, setTime] = useState(getCurrentTime());
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/pos/login');
    };

    return (
        <nav className="top-0 sticky flex justify-around items-center bg-white border-gray-500 border-b-4 w-full h-25 font-semibold text-2xl">
            <h1 className="text-3xl">SuperMart POS</h1>
            <a className={`hover:text-gray-700 ${location.pathname === '/pos' ? 'text-black' : 'text-gray-500'}`} href="/pos">Home</a>
            <a className={`hover:text-gray-700 ${location.pathname.startsWith('/pos/management') ? 'text-black' : 'text-gray-500'}`} href="/pos/management/overview">Management</a>
            <h1 className="text-gray-500"><i className="fa-regular fa-clock"></i> {time}</h1>
            <h1 className="text-gray-500">Cashier: {user?.username || 'Unknown'}</h1>
            <button 
                className="bg-black hover:bg-gray-800 px-6 py-3 rounded-xl text-white cursor-pointer"
                onClick={handleLogout}
            >
                LogOut
            </button>
        </nav>
    );
}