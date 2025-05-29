import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerSignUp() {
        const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [signUpForm, setSignUpForm] = useState({
        username: '',
        email: '',
        password: '',
        dob: ''
    });

    const handleSignUpFormChange = (e) => {
        const { name, value } = e.target;
        setSignUpForm({
            ...signUpForm,
            [name]: value
        });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!signUpForm.username || !signUpForm.email || !signUpForm.password || !signUpForm.dob) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', signUpForm);
            setLoading(false);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <h1 className="font-bold text-3xl">Welcome To SuperMart</h1>
            <h1 className="font-thin text-gray-500 text-xl">Let's Set up your account</h1>
            
            {error && <div className="w-110 text-red-500">{error}</div>}
            
            <form className="flex flex-col justify-center items-center gap-4 gap-5flex bg-white p-8 border-2 rounded-lg w-128 h-120" onSubmit={handleSignUpSubmit}>
                <div className="flex flex-col gap-2.5">
                    <label className="font-bold text-xl" htmlFor="username">Username</label>
                    <input 
                        className="p-2 border-2 rounded-md w-110 h-10" 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Enter Your Username"
                        value={signUpForm.username}
                        onChange={handleSignUpFormChange}
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
                        value={signUpForm.email}
                        onChange={handleSignUpFormChange}
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
                        value={signUpForm.password}
                        onChange={handleSignUpFormChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2.5">
                    <label className="font-bold text-xl" htmlFor="dob">DOB </label>
                    <input 
                        className="p-2 border-2 rounded-md w-110 h-10" 
                        type="date" 
                        name="dob" 
                        id="dob"
                        value={signUpForm.dob}
                        onChange={handleSignUpFormChange}
                        required
                    />
                </div>
                <button 
                    className="bg-black disabled:bg-gray-500 rounded-md w-110 h-10 text-white cursor-pointer"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <p>Or Continue With</p>
            <div className="flex gap-5">
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="button">
                    <i className="fa-brands fa-google"></i> Google
                </button>
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="button">
                    <i className="fa-brands fa-facebook"></i> Facebook
                </button>
            </div>
            <p className="cursor-pointer">
                Already have an account? <strong><a href="/login">Sign In</a></strong>
            </p>
        </div>
    )
}