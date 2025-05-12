export default function ManagementNavigation() {
    return (
        <nav className="flex flex-col justify-evenly bg-white shadow-md px-6 rounded-lg w-60 h-65">
            <a className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded-2xl font-bold text-xl ${location.pathname === '/pos/management/overview' ? 'bg-gray-100' : ''}`} href="/pos/management/overview">
                <img className="w-7 h-7" src="/src/assets/chart-bar.svg" alt="" />
                <p>Overview</p>
            </a>
            <a className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded-2xl font-bold text-xl ${location.pathname === '/pos/management/product' ? 'bg-gray-100' : ''}`} href="/pos/management/product">
                <img className="w-7 h-7" src="/src/assets/package.svg" alt="" />
                <p>Products</p>
            </a>
            <a className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded-2xl font-bold text-xl ${location.pathname === '/pos/management/transaction' ? 'bg-gray-100' : ''}`} href="/pos/management/transaction">
                <img className="w-7 h-7" src="/src/assets/note.svg" alt="" />
                <p>Transaction</p>
            </a>
            <a className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded-2xl font-bold text-xl ${location.pathname === '/pos/management/customer' ? 'bg-gray-100' : ''}`} href="/pos/management/customer">
                <img className="w-7 h-7" src="/src/assets/user.svg" alt="" />
                <p>Customers</p>
            </a>
        </nav>
    );
}