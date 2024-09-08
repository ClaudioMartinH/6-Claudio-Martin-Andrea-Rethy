import App from "@/App";
import LoginPage from "@/components/loginpage";

import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);
