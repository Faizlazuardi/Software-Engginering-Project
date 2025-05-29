import axios from "axios";

export const handleCustomerSignUp = async (e) => {
    const form = e.target;
    const data = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value,
        dob: form.dob.value,
    };

    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", data);
        alert("Registration successful!");
        return response.data;
    } catch (err) {
        console.error("Registration error:", err);
        alert("Registration failed!");
        return null;
    }
};

export const handleCustomerSignIn = async (e) => {
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.password.value,
    };

    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", data);
        alert("Login successful!");
        return response.data;
    } catch (err) {
        console.error("Login error:", err);
        alert("Login failed!");
        return null;
    }
}