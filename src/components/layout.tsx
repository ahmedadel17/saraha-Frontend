import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { useEffect } from "react";

const layout = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/auth/login";
  }, [localStorage.getItem("token")]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default layout;
