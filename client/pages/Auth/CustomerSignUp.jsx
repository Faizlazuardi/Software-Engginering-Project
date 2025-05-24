import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dob: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.username || !formData.email || !formData.password || !formData.dob) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            setLoading(false);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-180">
                <div className="bg-gray-500 rounded-2xl w-25 h-25"></div>
                <h1 className="font-bold text-3xl">Welcome To SuperMart</h1>
                <h1 className="font-thin text-gray-500 text-xl">Let's Set up your account</h1>
                
                {error && <div className="text-red-500 w-110">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="username">Username</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter Your Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="email">Email</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter Your Email"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="dob">DOB</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="date" 
                            name="dob" 
                            id="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button 
                        className="bg-black rounded-md w-110 h-10 text-white hover:cursor-pointer disabled:bg-gray-500" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
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
            <p className="hover:cursor-pointer">
                Already have an account? <strong><a href="/login">Sign In</a></strong>
            </p>
        </div>
    );
}