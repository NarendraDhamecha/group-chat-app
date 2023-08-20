import axios from "axios";
import { useEffect, useRef, useState } from "react";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef("");

  useEffect(() => {
    let lastMsgId = null;
    const oldmsgs = JSON.parse(localStorage.getItem("msgs"));
    if (oldmsgs && oldmsgs.length > 0) {
      lastMsgId = oldmsgs[oldmsgs.length - 1].id;
    }

    axios(`http://localhost:4000/chat/getmsgs?lastMsgId=${lastMsgId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        let allMsgs = [];
        if (oldmsgs && oldmsgs.length > 0) {
          allMsgs = [...oldmsgs, ...res.data];
        } else {
          allMsgs = [...res.data];
        }

        if (allMsgs.length > 10) {
          const latestAllMsgs = allMsgs.slice(allMsgs.length - 10);
          localStorage.setItem("msgs", JSON.stringify(latestAllMsgs));
          setMessages(latestAllMsgs);
          return;
        }
        localStorage.setItem("msgs", JSON.stringify(allMsgs));
        setMessages(allMsgs);
      })
      .catch((err) => console.log(err));
  }, []);

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
        {messages.slice(messages.length-10).map((data) => {
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
