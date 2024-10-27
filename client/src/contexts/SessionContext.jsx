/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      setUser(user);
    } else {
      setIsLogin(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    setIsLogin(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = (data) => {
    if (data) {
      setIsLogin(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <SessionContext.Provider value={{ isLogin, user, loading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
