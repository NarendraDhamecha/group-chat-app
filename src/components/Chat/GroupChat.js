import axios from "axios";
import { useEffect, useRef, useState } from "react";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef("");

  useEffect(() => {
    axios("http://localhost:4000/chat/getmsgs", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => setMessages(res.data))
      .catch((err) => console.log(err));
  },[]);

  const sendMsgHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/chat/sendmsg",
        { msg: messageRef.current.value },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const newMsg = {
        message: messageRef.current.value,
        name: response.data.name,
      };

      setMessages((prevMsgs) => [...prevMsgs, newMsg]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Chat App</h2>
      <div>
        {messages.map((data) => {
          return (
            <p key={Math.random()}>
              {data.name}: {data.message}
            </p>
          );
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
