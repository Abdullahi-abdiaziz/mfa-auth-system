import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return (
    <div className=" h-screen flex justify-center items-center bg-custom-gradient bg-contain bg-no-repeat relative z-50 bg-white">
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
