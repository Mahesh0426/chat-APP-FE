import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../Pages/Auth/RegisterPage";
import CheckEmailPage from "../Pages/Auth/CheckEmailPage";
import CheckPasswordPage from "../Pages/Auth/CheckPasswordPage";
import Home from "../Pages/home/Home";
import App from "../App";
import Message from "../components/Message";
import AuthLayout from "../layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: (
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "/email",
        element: (
          <AuthLayout>
            <CheckEmailPage />
          </AuthLayout>
        ),
      },
      {
        path: "/password",
        element: (
          <AuthLayout>
            <CheckPasswordPage />
          </AuthLayout>
        ),
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <Message />,
          },
        ],
      },
    ],
  },
]);

export default router;
