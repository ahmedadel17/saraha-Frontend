import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../components/ui/form";
import { Link } from "react-router-dom";
import MyInput from "../components/MyInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
const Login = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);

      // alert("Signup successful!");
      toast({
        title: "signin successful!",
        description: (
          <p className="text-sm text-gray-500">
            {" "}
            user registered successfully please login now
          </p>
        ),
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        alert("No response from server.");
      } else {
        // Something else happened in setting up the request
        console.error("Error:", error.message);
        alert("An error occurred.");
      }
    }
  }
  return (
    <div className="lg:w-1/3 xl:w-1/4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MyInput
            control={form.control}
            label="Email"
            description="Enter your username"
            placeholder="email"
            name="email"
          />
          <MyInput
            control={form.control}
            label="Password"
            description="Enter your Password"
            placeholder="password"
            name="password"
          />
          <Button type="submit" className="w-full bg-branding">
            Signin
          </Button>
          <div className="flex justify-center gap-2">
            <p className="text-gray-500">Don't have an account?</p>
            <Link to="/auth/signup" className="text-branding">
              Signup
            </Link>
          </div>
          <div className="justify-center items-center flex">
            <Link
              className="text-gray-400 text-center hover:text-branding"
              to="/auth/forgetPassword"
            >
              Forget Password?
            </Link>
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default Login;
