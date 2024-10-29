import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SessionProvider } from "./contexts/SessionContext";

const App = () => {
  return (
    <div className="min-h-screen bg-custom-gradient bg-contain bg-no-repeat relative z-50 bg-white">
      <div>
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
};

export default App;
