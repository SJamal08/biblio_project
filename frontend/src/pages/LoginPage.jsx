import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/authSlice'; // Action Redux
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error before request
        try {
            // Step 1: Perform login
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            const { token } = response.data;

            // Step 2: Retrieve user information using the token
            const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = userResponse.data;

            // Step 3: Save the token and user in Redux and localStorage
            dispatch(loginSuccess({ token, user }));
            localStorage.setItem('token', token);

            console.log("user")
            console.log(user)

            // Step 4: Redirect based on user role
            if (user.role === 'librarian' || user.role === 'admin') {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {error && (
                    <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                        {error}
                    </div>
                )}
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
