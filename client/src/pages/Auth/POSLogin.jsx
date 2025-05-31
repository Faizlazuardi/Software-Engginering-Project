import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export default function POSLogin() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!credentials.email || !credentials.password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        const result = await login(credentials.email, credentials.password);
        
        if (result.success) {
            // Check if user is admin for POS access
            if (result.user.role === 'admin') {
                navigate('/pos');
            } else {
                setError('Access denied. Admin privileges required.');
            }
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-130">
                <h1 className="font-bold text-3xl">SuperMart POS Login</h1>
                <h1 className="font-thin text-gray-500 text-xl">Enter your credentials to access the system</h1>
                
                {error && <div className="text-red-500 w-110">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="email">Email</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter Your Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">Password</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter Your Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center w-110 h-10">
                        <div className="flex items-center gap-3">
                            <input className="w-6 h-6" type="checkbox" name="remember" id="remember"/>
                            <label className="text-md" htmlFor="remember">Remember Me</label>
                        </div>
                        <a href="#" className="font-bold text-md">Forgot Password?</a>
                    </div>
                    <button 
                        className="bg-black rounded-md w-110 h-10 text-white disabled:bg-gray-500" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p>Need help? Contact <strong>System Administrator</strong></p>
            </div>
        </div>
    );
}