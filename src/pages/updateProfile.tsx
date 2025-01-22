import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../hooks/use-toast";
import { RadioGroupForm } from "../components/radiobutton";
import MyInput from "../components/MyInput";
import { Form } from "../components/ui/form";
import { useEffect } from "react";
import { Toaster } from "../components/ui/toaster";

export default function UpdateProfile() {
  const formSchema = z.object({
    userName: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(50, { message: "Username must not exceed 50 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    email: z.string().email({ message: "Invalid email address." }),
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
      address: "",
      gender: "male",
    },
  });

  // 2. Define a submit handler.
  interface SignupData {
    userName: string;
    email: string;
    address: string;
    gender: string;
  }
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/edit", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`, // Add the token to the Authorization header
        },
      });
      form.setValue("userName", response.data.user.userName);
      form.setValue("email", response.data.user.email);
      form.setValue("address", response.data.user.address);
      form.setValue("gender", response.data.user.gender);
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(
        "http://localhost:3000/user/updateProfile",
        values,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Add the token to the Authorization header
          },
        }
      );

      toast({
        title: "user updated ",
        description: (
          <p className="text-sm text-gray-500">
            {" "}
            user updated successfully please login now
          </p>
        ),
      });
      //  setTimeout(() => {
      //    navigate("/auth/login");
      //  }, 3000);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
        alert(`Error: ${error.response.data || "Something went wrong"}`);
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="   border px-3 box-border py-4 flex flex-col"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-branding rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster />
    </Form>
  );
}
