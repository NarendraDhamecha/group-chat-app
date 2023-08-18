import { useRef, useState } from "react";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef("");

  const sendMsgHandler = (e) => {
    e.preventDefault();

    const newMsg = messageRef.current.value;

    setMessages((prevMsgs) => {
        return [...prevMsgs, newMsg]
    })
  };
  return (
    <div>
      <h2>Chat App</h2>
      <div>
        {messages.map((msg) => {
            return <p key={Math.random()}>you: {msg}</p>
        })}
      </div>
      <div>
        <form onSubmit={sendMsgHandler}>
          <input type="text" placeholder="Type..." ref={messageRef} />
          <button type="submit">Send message</button>
        </form>
      </div>
    </div>
  );
};

export default GroupChat;
