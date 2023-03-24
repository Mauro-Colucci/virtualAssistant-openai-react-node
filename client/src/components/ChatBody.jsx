import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

const ChatBody = ({ chat }) => {
  const openai = "bg-white bg-opacity-40 self-end";

  const parent = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chat.map((message, i) => (
        <div
          ref={scrollRef}
          key={i}
          className={`border-white border-2 rounded-xl p-3 max-w-[80%] ${
            message.sender === "ai" ? openai : "self-start"
          }`}
        >
          <span className="whitespace-pre-wrap">{message.message}</span>
        </div>
      ))}
    </div>
  );
};
export default ChatBody;
