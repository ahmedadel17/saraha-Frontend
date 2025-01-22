import { Link, Outlet } from "react-router-dom";
import logo from "../../public/assets/saraha-logo.png";
const AuthLayout = () => {
  return (
    <div className="h-screen w-screen flex flex-col p-5 justify-center  ">
      <header className="flex flex-col items-center justify-center ">
        <img src={logo} className="w-24" />
        <p className="text-center text-3xl font-dancing text-branding">
          Saraha App
        </p>
        <hr className="w-1/3 lg:w-1/6 border-t-2 border-branding mt-2" />
      </header>
      <main className="flex justify-center   h- p-3 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
