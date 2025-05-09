import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));

    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue: AuthContextType = useMemo(
        () => ({
            token,
            setToken,
            login: (token: string) => setToken(token),
            logout: () => setToken(null),
            isAuthenticated: !!token,
        }),
        [token]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
