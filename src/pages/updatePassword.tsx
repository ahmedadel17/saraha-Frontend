import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../components/ui/form";
import MyInput from "../components/MyInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";
import { useState } from "react";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formSchema = z.object({
    currentPassword: z
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
    newPassword: z
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
      currentPassword: "",
      newPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(
        "http://localhost:3000/user/updatePassword",
        values,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Add the token to the Authorization header
          },
        }
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

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data.message);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
        setError(error.response.data.message);
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
    <div className="h-screen p-4 flex flex-col  justify-center   ">
      <div>
        <header className="flex flex-col items-center justify-center py-10 ">
          <p className="text-center text-3xl font-Frank text-branding">
            Update Password
          </p>
          <hr className="w-1/6 border-t-2 border-branding mt-2" />
        </header>
        <main className="flex justify-center   ">
          <div className="lg:w-1/3 xl:w-1/4 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <MyInput
                  control={form.control}
                  label="Current password"
                  description="Enter your Current Password"
                  placeholder="current password"
                  name="currentPassword"
                />
                <MyInput
                  control={form.control}
                  label="New password"
                  description="Enter your new password"
                  placeholder="New password"
                  name="newPassword"
                />
                <Button type="submit" className="w-full bg-branding">
                  Update password
                </Button>
              </form>
            </Form>
            <Toaster />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdatePassword;
