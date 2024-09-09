import MainPage from '../screens/MainPage';
import App from '../App';
import LoginPage from "../screens/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import RegisterPage from '../screens/RegisterPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
    children: [
      {
        path: "/",
        element: <LoginPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
      {
        path: "register",
        element: <RegisterPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },
      {
        path: "home",
        element: <MainPage />,
        errorElement: <div>THIS PAGE DOES NOT EXIST</div>,
      },

    ],
  },
]);
