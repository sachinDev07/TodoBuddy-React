import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Todo from "./components/Todo.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const SignUpPage = lazy(() => import("./components/SignUp"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/todo",
        element: (
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <Suspense>
            <SignUpPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
