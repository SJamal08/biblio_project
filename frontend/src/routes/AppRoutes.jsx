import React, { useInsertionEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
// import Dashboard from '../pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import LibrarianDashboard from '../pages/LibrarianDashboard';
import BookList from '../components/Booklist';
import { checkAuth } from '../features/authSlice';

const AppRoutes = () => {

    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    console.log("isAuthenticated")
    console.log(isAuthenticated)

    useInsertionEffect(() => {
        // Vérifier l'authentification au montage du composant
        dispatch(checkAuth());
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated  && (user?.role === 'librarian' || user.role === 'admin')  ? <Navigate to="/dashboard" /> : <LoginPage />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated && (user?.role === 'librarian' || user.role === 'admin') ? <LibrarianDashboard /> : <Navigate to="/login" />}
                />
                <Route path="/books" element={<BookList />} />
                {/* Ajouter d'autres routes ici */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
