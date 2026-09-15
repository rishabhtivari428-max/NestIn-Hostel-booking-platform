import { useState } from 'react';
import { AuthContext } from './authContext';
import { registerUser, loginUser } from '../services/auth.service';

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false);

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

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
}