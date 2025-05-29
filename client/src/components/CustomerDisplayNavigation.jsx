import { useEffect, useState } from 'react';

export default function POSNavigation() {
    const [time, setTime] = useState(getCurrentTime());
    
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

    return (
        <nav className="top-0 sticky flex justify-between items-center bg-white px-10 border-gray-500 border-b-4 w-full h-25 font-semibold text-2xl">
            <h1 className="text-3xl">SuperMart POS</h1>
            <div className="flex space-x-10">                
                <h1 className="text-gray-500"><i className="fa-regular fa-clock"></i> {time}</h1>
                <h1 className="text-gray-500">Cashier : John Mama</h1>
            </div>
        </nav>
    );
}