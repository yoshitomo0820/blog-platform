import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

interface AuthContextProps{
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) =>Promise<void>;
    logout: () => void;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = (children) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            axios.defaults.headers.common['x-auth-token'] = token;
            axios.get('/api/auth/user').then(response => {
                setIsAuthenticated(true);
                setUser(response.data);
            })
            .catch(err => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            });
        }
    },[]);

    const login = async(email:string, password: string) => {
        try {
            const res = await axios.post('/api/auth/login', {email,password});
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            const userRes = await axios.get('/api/auth/user');
            setIsAuthenticated(true);
            setUser(userRes.data);
        }catch(err){
            console.error(err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const register = async(name: string, email:string, password: string) => {
        try {
            const res = await axios.post('/api/auth/login', {name, email, password});
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            const userRes = await axios.get('/api/auth/user');
            setIsAuthenticated(true);
            setUser(userRes.data);
        }catch(err){
            console.error(err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {/* {children} */}
        </AuthContext.Provider>
    );
};