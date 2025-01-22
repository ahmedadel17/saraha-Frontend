import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";
import { toast } from "../hooks/use-toast";
import { Toaster } from "../components/ui/toaster";

export default function SentMessages() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      // Replace with your actual token
      const response = await axios.get(
        "http://localhost:3000/message/sentMessages",
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Add the token to the Authorization header
          },
        }
      );

      setData(response.data.messages); // Handle the response data
      console.log;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/message/delete/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      getData();
      toast({
        title: "Message deleted successfully",
        description: (
          <p className="text-sm text-gray-500">
            {" "}
            Message deleted successfully",
          </p>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Sent messages
          </h2>
          <p className="mt-2 text-lg/8 text-gray-500">messages you sent.</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8  gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {data.map((item) => (
              <div
                key={item._id}
                className="relative pl-16 shadow-lg p-4 rounded-lg"
              >
                <dt className="text-base/7 font-semibold text-gray-900 flex justify-between  ">
                  <div className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-lg ">
                    {/* <feature.icon aria-hidden="true" className="size-6 text-white" /> */}
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>
                        {item?.sender?.userName[0] + item?.sender?.userName[1]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {/* {feature.name} */}
                  <span className="capitalize">
                    <span className="text-gray-400">sent To: </span>
                    {item?.receiver?.userName}
                  </span>
                  <TrashIcon
                    className="text-red-600 w-8 h-8 hover:cursor-pointer hover:bg-red-300 hover:text-white rounded-lg p-2"
                    onClick={() => {
                      handleDelete(item?._id);
                    }}
                  />
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {item?.content}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {data?.length === 0 && (
          <div className="mx-auto mt-16 max-w-2xl p-24 sm:mt-20 lg:mt-24 lg:max-w-4xl   ">
            <InboxIcon className="text-orange-500  w-[250px] h-[250px]  mx-auto" />
            <p className="text-center text-gray-400 text-lg ">
              you did not send a message yet!
            </p>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
