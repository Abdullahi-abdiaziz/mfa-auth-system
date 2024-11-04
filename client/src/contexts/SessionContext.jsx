/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const SESSION_DURATION = 3600000; // 1 hour in milliseconds

  // Define the isSessionExpired function
  const isSessionExpired = () => {
    const expiration = localStorage.getItem("expiration");
    return !expiration || Date.now() > parseInt(expiration, 10);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const expiration = localStorage.getItem("expiration");

    if (storedUser && expiration && Date.now() < parseInt(expiration, 10)) {
      setIsLogin(true);
      setIsVerified(true);
      setUser(storedUser);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("expiration");
      setIsLogin(false);
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (user) => {
    const expirationTime = Date.now() + SESSION_DURATION;
    setIsLogin(true);
    setIsVerified(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiration", expirationTime);
  };

  const logout = () => {
    setIsLogin(false);
    setIsVerified(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expiration");
  };

  return (
    <SessionContext.Provider
      value={{
        isLogin,
        isVerified,
        user,
        loading,
        login,
        logout,
        isSessionExpired, // Add isSessionExpired to the context
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
