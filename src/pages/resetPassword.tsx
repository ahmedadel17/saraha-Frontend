import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../components/ui/form";
import MyInput from "../components/MyInput";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import { useState } from "react";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formSchema = z.object({
    password: z
      .string()
      .min(8, { message: "current Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "current Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "current Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "current Password must contain at least one number.",
      })
      .regex(/[@$!%*?&#]/, {
        message:
          "current Password must contain at least one special character (@$!%*?&#).",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "new password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "new password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "new password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        message: "new password must contain at least one number.",
      })
      .regex(/[@$!%*?&#]/, {
        message:
          "new password must contain at least one special character (@$!%*?&#).",
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/resetPassword/${token}`,
        values
      );
      if (response) {
        toast({
          title: "password updated successfully",
          description: (
            <p className="text-sm text-gray-500">
              {" "}
              Password updated successfully
            </p>
          ),
        });
      }

      // alert("Signup successful!");
      toast({
        title: "password updated successfully",
        description: (
          <p className="text-sm text-gray-500">
            {" "}
            your password updated successfully
          </p>
        ),
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data.message);
        toast({
          title: "Error",
          description: (
            <p className="text-sm text-gray-500">
              {" "}
              {error.response.data.message || "Something went wrong"}
            </p>
          ),
        });

        setError(error.response.data.message);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        toast({
          title: "Error",
          description: (
            <p className="text-sm text-gray-500"> "No response from server."</p>
          ),
        });
      } else {
        // Something else happened in setting up the request
        toast({
          title: "Error",
          description: (
            <p className="text-sm text-gray-500">
              {" "}
              {error.message}||{"an error occured"}
            </p>
          ),
        });
      }
    }
  }
  return (
    <>
      <div className="lg:w-1/3 xl:w-1/4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <MyInput
              control={form.control}
              label="Password"
              description="Enter your Password"
              placeholder="Password"
              name="password"
            />
            <MyInput
              control={form.control}
              label="confirm Password"
              description="Enter your confirm Password"
              placeholder="confirm Password"
              name="confirmPassword"
            />
            <Button type="submit" className="w-full bg-branding">
              Update password
            </Button>
          </form>
        </Form>
        <Toaster />
      </div>
    </>
  );
};

export default ResetPassword;
