import { useState } from "react";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useMutation } from "@tanstack/react-query";
import fetchResponse from "../utils/fetchResponse";

const Assistant = () => {
  const [chat, setChat] = useState([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.trim() },
      ]),
  });

  const sendMessage = (message) => {
    setChat((prev) => [...prev, message]);
    mutation.mutate();
  };
  return (
    <div className="bg-slate-800 h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">
      <h2 className="text-2xl uppercase font-bold text-center mb-3">
        Virtual Assistant
      </h2>
      <div className="h-[90%] overflow-y-scroll w-full max-w-4xl min-w-[20rem] mb-2 py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-transparent">
        <ChatBody chat={chat} />
      </div>
      <div className=" w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
};
export default Assistant;
