import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerSignIn() {
        const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [signInForm, setsignInForm] = useState({
        email: '',
        password: ''
    });

    const handleSignInFormChange = (e) => {
        const { name, value } = e.target;
        setsignInForm({
            ...signInForm,
            [name]: value
        });
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', signInForm);
            
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
            <h1 className="font-bold text-3xl">Welcome To SuperMart</h1>
            <h1 className="font-thin text-gray-500 text-xl">Sign in to your account</h1>
            
            {error && <div className="w-110 text-red-500">{error}</div>}
            
            <div className="flex flex-col gap-5">
                <form className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-90" onSubmit={handleSignInSubmit}>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="email">Email</label>
                        <input 
                            className="p-2 border-2 rounded-md w-110 h-10" 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter Your Email"
                            value={signInForm.email}
                            onChange={handleSignInFormChange}
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
                            value={signInForm.password}
                            onChange={handleSignInFormChange}
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
                        className="bg-black disabled:bg-gray-500 rounded-md w-110 h-10 text-white hover:cursor-pointer" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
            <p>Or Continue With</p>
            <div className="flex gap-5">
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="button">
                    <i className="fa-brands fa-google"></i> Google
                </button>
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="button">
                    <i className="fa-brands fa-facebook"></i> Facebook
                </button>
            </div>
            <p className="cursor-pointer">Don’t have an account? <strong><a href="/register">Sign Up</a></strong></p>
        </div>
    );
}