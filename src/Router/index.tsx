import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AuthLayout from "../Auth/authlayout";
import Login from "../Auth/signin";
import Signup from "../Auth/signup";
import ActivateAccount from "../pages/ActivateAccount";
import Layout from "../components/layout";
import Profile from "../pages/profile";
import UpdatePassword from "../pages/updatePassword";
import UpdateProfile from "../pages/updateProfile";
import NotFound from "../pages/notFoundpage";
import Message from "../pages/message";
import MyMessages from "../pages/myMessages";
import ReceivedMessages from "../pages/receivedMessages";
import ForgetPassword from ".././Auth/forgetPassword";
import ResetPassword from "../pages/resetPassword";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetPassword/:token", element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ReceivedMessages /> },
      { path: "/profile", element: <Profile /> },
      { path: "/updatePassword", element: <UpdatePassword /> },
      { path: "/updateProfile", element: <UpdateProfile /> },
      {
        path: "/sarhni/:id",
        element: <Message />,
      },
      {
        path: "/sentMessages",
        element: <MyMessages />,
      },
      {
        path: "/receivedMessages",
        element: <ReceivedMessages />,
      },
    ],
  },
  {
    path: "/activateAccount/:token",
    element: <ActivateAccount />,
  },

  {
    path: "/about",
    element: <div></div>,
  },
  {
    path: "/contact",
    element: <div></div>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
