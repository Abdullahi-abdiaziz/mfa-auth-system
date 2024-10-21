import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return (
    <div className="bg-slate-900 h-screen">
      <div className="flex justify-center items-center text-white h-screen text-4xl">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
