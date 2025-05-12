import { useEffect, useState } from 'react';

export default function POSNavigation() {
    const [time, setTime] = useState(getCurrentTime());
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    useEffect(() => {
    const interval = setInterval(() => {
        setTime(getCurrentTime());
    }, 1000);
    
    return () => clearInterval(interval);
    }, []);

    return (
        <nav className="top-0 sticky flex justify-around items-center bg-white border-gray-500 border-b-4 w-full h-25 font-semibold text-2xl">
            <h1 className="">SuperMart POS</h1>
            <a className={`hover:text-gray-700  ${location.pathname === '/pos' ? 'text-black' : 'text-gray-500'}`} href="/pos">Home</a>
            <a className={`hover:text-gray-700 ${location.pathname.startsWith('/pos/management')  ? 'text-black' : 'text-gray-500'}`} href="/pos/management/overview">Management</a>
            <h1 className="text-gray-500"><i className="fa-regular fa-clock"></i> {time}</h1>
            <h1 className="text-gray-500">Cashier : John Mama</h1>
            <button className="bg-black px-6 py-3 rounded-xl text-white hover:cursor-pointer">LogOut</button>
        </nav>
    );
}