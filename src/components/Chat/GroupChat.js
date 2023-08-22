import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useGetMessages from "../Hooks/useGetMessages";

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const messageRef = useRef("");
  const [groups, setGroups] = useState([]);
  const getMessages = useGetMessages();

  useEffect(() => {
    const grpId = isGroupOpen ? isGroupOpen.id : null;
    getMessages(grpId)
      .then((res) => setMessages(res))
      .catch((err) => console.log(err));
  }, [getMessages, isGroupOpen]);

  useEffect(() => {
    axios("http://localhost:4000/group/getgroup", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        setGroups(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendMsgHandler = async (e) => {
    e.preventDefault();

    const messageDetails = {
      msg: messageRef.current.value,
      groupId: isGroupOpen.id ? isGroupOpen.id : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/chat/sendmsg",
        messageDetails,
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

      setMessages((prevMsgs) => {
        const tempMsgs = [...prevMsgs, newMsg];
        if (tempMsgs.length > 10) {
          return tempMsgs.slice(tempMsgs.length - 10);
        }
        return tempMsgs;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onGroupClick = (grp) => {
    setIsGroupOpen(grp);
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
      <div>
        {groups.map((grp) => {
          return (
            <p onClick={() => onGroupClick(grp)} key={grp.id}>
              {grp.name}
            </p>
          );
        })}
      </div>
      <NavLink to="/groups">See your groups</NavLink>
    </div>
  );
};

export default GroupChat;
