import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const handleCustomerSignIn = async () => {
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

    return {
        signInForm,
        error,
        loading,
        handleSignInFormChange,
        handleSignInSubmit
    };
}

const handleCustomerSignUp = async () => {
    const [signUpform, setsignUpForm] = useState({
        username: '',
        email: '',
        password: '',
        dob: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUpFormChange = (e) => {
        const { name, value } = e.target;
        setsignUpForm({
            ...signUpform,
            [name]: value
        });
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!signUpform.username || !signUpform.email || !signUpform.password || !signUpform.dob) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', signUpform);
            setLoading(false);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return {
        signUpform,
        error,
        loading,
        handleSignUpFormChange,
        handleSignUpSubmit
    };
}