import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Thêm state loading

    useEffect(() => {
        const getProfile = async () => {
            try {
                let token = localStorage.getItem("token");
                if (token) {
                    const decoded = jwtDecode(token);
                    setUser(decoded.username);
                    setRole(decoded.role);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            } finally {
                setLoading(false); // Dừng loading sau khi hoàn thành
            }
        };

        getProfile();
    }, []);

    // Nếu đang loading, không render children
    if (loading) {
        return <div>Loading...</div>; // Hoặc một spinner loading
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                isAuthenticated,
                setUser, // Thêm setUser vào context
                setRole, // Thêm setRole vào context
                setIsAuthenticated, // Thêm setIsAuthenticated vào context
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);