import { useLocation } from 'react-router-dom';

export default function ManagementNavigation() {
    const location = useLocation();

    const navItems = [
        { name: 'Overview', path: '/pos/management/overview' },
        { name: 'Products', path: '/pos/management/product' },
        { name: 'Transactions', path: '/pos/management/transaction' },
        { name: 'Customers', path: '/pos/management/customer' }
    ];

    return (
        <nav className="flex flex-col gap-2 bg-white shadow-sm p-5 rounded-2xl w-72">
            <h2 className="font-bold text-xl mb-3">Management</h2>
            {navItems.map((item) => (
                <a
                    key={item.name}
                    href={item.path}
                    className={`p-3 rounded-lg hover:bg-gray-100 ${
                        location.pathname === item.path 
                        ? 'bg-black text-white' 
                        : 'text-gray-700'
                    }`}
                >
                    {item.name}
                </a>
            ))}
        </nav>
    );
}