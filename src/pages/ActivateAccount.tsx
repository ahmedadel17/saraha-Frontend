import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ActivateAccount = () => {
  const { token } = useParams();
  const activateAccountApi = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/activateAccount/${token}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    activateAccountApi();
  }, []);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Your Account is Activated Successfully
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          You can now log in to your account
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/auth/login"
            className="rounded-md bg-branding px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ActivateAccount;
