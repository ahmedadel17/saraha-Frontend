import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MyTextArea from "../components/MyTextarea";

import { Textarea } from "../components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "../components/ui/toaster";
import { toast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export function TextareaForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { id } = useParams();
  console.log(id);
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:3000/message/create",
        { ...values, receiver: id },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      // alert("Signup successful!");
      toast({
        title: "Message Sent Successfully!",
        description: (
          <p className="text-sm text-gray-500"> message Sent Successfully</p>
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border px-3 box-border py-4 flex flex-col"
      >
        <MyTextArea
          control={form.control}
          name="content"
          label="Message"
          placeholder="Write your message here"
          description="Write your message here"
        />

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="bg-branding rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
      </form>
      <Toaster />
    </Form>
  );
}

export default TextareaForm;
