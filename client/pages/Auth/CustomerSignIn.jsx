import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            
            localStorage.setItem('token', response.data.token);
            
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            setLoading(false);
            
            navigate('/dashboard');
            
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-150">
                <div className="bg-gray-500 rounded-2xl w-25 h-25"></div>
                <h1 className="font-bold text-3xl">Welcome To SuperMart</h1>
                <h1 className="font-thin text-gray-500 text-xl">Sign in to your account</h1>
                
                {error && <div className="text-red-500 w-110">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full items-center">
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
                        <a href="/forgot-password" className="font-bold text-md">Forgot Password?</a>
                    </div>
                
                    <button 
                        className="bg-black rounded-md w-110 h-10 text-white hover:cursor-pointer disabled:bg-gray-500" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
            <p>Or Continue With</p>
            <div className="flex gap-5">
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl hover:cursor-pointer" type="button">
                    <i className="fa-brands fa-google"></i> Google
                </button>
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl hover:cursor-pointer" type="button">
                    <i className="fa-brands fa-facebook"></i> Facebook
                </button>
            </div>
            <p className="hover:cursor-pointer">Don't have an account? <strong><a href="/register">Sign Up</a></strong></p>
        </div>
    );
}