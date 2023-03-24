import { useEffect, useRef, useState } from "react";

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");
  /*  const textRef = useRef();

  useEffect(() => {
    textRef.current.focus();
  }, [value]); */

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value.trim() });
    setValue("");
  };
  return (
    <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg p-4 overflow-auto relative">
      {loading ? (
        <img
          src="./loader.gif"
          alt="Content is loading."
          className="w-8 m-auto"
        ></img>
      ) : (
        <>
          <textarea
            autoFocus
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows="1"
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            /* ref={textRef} */
          />
          <img
            onClick={handleSubmit}
            width={20}
            src="./send.png"
            alt="send query."
            className="absolute top-4 right-3 cursor-pointer hover:scale-125 ease-in duration-100"
          />
        </>
      )}
    </div>
  );
};
export default ChatInput;
