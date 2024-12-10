import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}!</h1>
            <p className="mt-4 text-gray-600">This is your dashboard.</p>
        </div>
    );
};

export default Dashboard;
