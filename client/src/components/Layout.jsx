import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="text-center w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
};

export default Layout;
