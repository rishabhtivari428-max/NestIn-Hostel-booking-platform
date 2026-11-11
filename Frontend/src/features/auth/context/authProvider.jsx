import { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { registerUser, loginUser, fetchCurrentUser, logoutUser } from '../services/auth.service';

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    // Automatically check current user from cookie on initial load / OAuth redirect
    useEffect(() => {
        fetchCurrentUser()
            .then((data) => setuser(data.user))
            .catch(() => setuser(null))
            .finally(() => setloading(false));
    }, []);

    const handleLogin = async (email, password) => {
        setloading(true);
        try {
            const response = await loginUser(email, password);
            setuser(response.user);
            return response.user;
        } catch (error) {
            console.log('Error while logging you in...', error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const handleRegister = async (username, email, password, phone, gender, role) => {
        setloading(true);
        try {
            const response = await registerUser(username, email, password, phone, gender, role);
            setuser(response.user);
        } catch (error) {
            console.log("Error while registering User...", error);
        } finally {
            setloading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setuser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}