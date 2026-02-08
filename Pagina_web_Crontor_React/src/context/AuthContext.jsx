import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRank, setUserRank] = useState('Aldeano');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const storedUser = localStorage.getItem('crontor_current_user');
        const storedRank = localStorage.getItem('crontor_user_rank');

        if (storedUser) {
            setCurrentUser(storedUser);
            if (storedRank) {
                setUserRank(storedRank);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        // Get stored users from localStorage
        const users = JSON.parse(localStorage.getItem('crontor_users') || '{}');

        // Check if user exists and password matches
        if (users[username] && users[username] === password) {
            localStorage.setItem('crontor_current_user', username);
            setCurrentUser(username);

            // Load user rank if exists
            const savedRank = localStorage.getItem('crontor_user_rank');
            if (savedRank) {
                setUserRank(savedRank);
            }

            return { success: true, message: `¡Bienvenido de vuelta, ${username}!` };
        }

        return { success: false, message: 'Usuario o contraseña incorrectos' };
    };

    const register = (username, password, confirmPassword) => {
        // Validate passwords match
        if (password !== confirmPassword) {
            return { success: false, message: 'Las contraseñas no coinciden' };
        }

        // Get stored users from localStorage
        const users = JSON.parse(localStorage.getItem('crontor_users') || '{}');

        // Check if username already exists
        if (users[username]) {
            return { success: false, message: 'Este nombre de usuario ya está en uso' };
        }

        // Store new user
        users[username] = password;
        localStorage.setItem('crontor_users', JSON.stringify(users));

        // Auto login
        localStorage.setItem('crontor_current_user', username);
        setCurrentUser(username);

        return { success: true, message: `¡Cuenta creada exitosamente! Bienvenido, ${username}!` };
    };

    const logout = () => {
        localStorage.removeItem('crontor_current_user');
        setCurrentUser(null);
        setUserRank('Aldeano');
    };

    const updateRank = (newRank) => {
        localStorage.setItem('crontor_user_rank', newRank);
        setUserRank(newRank);
    };

    const value = {
        currentUser,
        userRank,
        isLoading,
        login,
        register,
        logout,
        updateRank
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
