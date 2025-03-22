import React from "react";
import { useAuth } from "../context/AuthProvider";
import { logout } from "../services/authService"; // Import hàm logout từ authService

function Logout() {
  const { setIsAuthenticated, setUser, setRole } = useAuth();

  const handleLogout = () => {
    try {
      logout(); // Gọi hàm logout từ authService
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;