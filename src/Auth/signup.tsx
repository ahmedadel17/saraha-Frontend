import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../components/ui/form";
import { Link } from "react-router-dom";
import MyInput from "../components/MyInput";
import { RadioGroupForm } from "../components/radiobutton";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    userName: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(50, { message: "Username must not exceed 50 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    email: z.string().email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&#]/, {
        message:
          "Password must contain at least one special character (@$!%*?&#).",
      }),

    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters." }),

    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." })
      .max(100, { message: "Address must not exceed 100 characters." }),

    gender: z.enum(["male", "female"], {
      message: "You must select a valid gender.",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "male",
    },
  });

  // 2. Define a submit handler.
  interface SignupData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    gender: string;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values
      );

      // alert("Signup successful!");
      toast({
        title: "Signup successful!",
        description: (
          <p className="text-sm text-gray-500">
            {" "}
            user registered successfully please login now
          </p>
        ),
      });
      setTimeout(() => {
        navigate("/auth/login");
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
    <div className="lg:w-1/3 xl:w-1/4 w-full  ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <MyInput
            control={form.control}
            label="Username"
            description="Enter your username"
            placeholder="Username"
            name="userName"
          />
          <MyInput
            control={form.control}
            label="Email"
            description="Enter your email"
            placeholder="Email"
            name="email"
          />
          <MyInput
            control={form.control}
            label="Password"
            description="Enter your Password"
            placeholder="Password"
            name="password"
          />
          <MyInput
            control={form.control}
            label="Confirm Password"
            description="Enter Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <MyInput
            control={form.control}
            label="address"
            description="Enter your address"
            placeholder="address"
            name="address"
          />
          <RadioGroupForm
            control={form.control}
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            direction="row"
            label="Gender"
            field="gender"
          />
          <Button type="submit" className="w-full bg-branding">
            Signup
          </Button>
          <div className="flex justify-center gap-2">
            <p className="text-gray-500">Already have an account?</p>
            <Link to="/auth/login" className="text-branding">
              Login
            </Link>
          </div>
          <div className="justify-center items-center flex">
            <Link
              className="text-gray-400 text-center  hover:text-branding"
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

export default Signup;
