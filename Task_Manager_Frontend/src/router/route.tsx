import { createBrowserRouter, Navigate } from "react-router-dom";
import { Dashboard } from "../page/dashboard";
import { SignIn } from "../page/signIn";
import { AuthLayout } from "../_layout/AuthLayout";
import { Register } from "../page/dashboard/register";
import { PrivateLayout } from "../_layout/PrivateLayout";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth/signIn' replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: 'signIn',
        element: <SignIn />
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  },
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/auth/signIn" replace />
  }
]);