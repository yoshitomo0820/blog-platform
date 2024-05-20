import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

interface AuthContextProps{
    isAuthenticated: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) =>Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider :React.FC = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

    },[]);

    const login = async(email:string, password: string) => {
        const res = await axios.post('/api/auth/login', {email,password});
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
    };
}