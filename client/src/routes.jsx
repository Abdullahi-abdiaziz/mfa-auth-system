import { createBrowserRouter } from "react-router-dom";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import Verify2FAuth from "./pages/Verify2FAuth";
import Setup2FAuth from "./pages/Setup2FAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <Error />,
  },

  {
    element: <ProtectedUserRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FAuth />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FAuth />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
