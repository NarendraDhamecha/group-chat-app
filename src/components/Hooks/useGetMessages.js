import { useCallback } from "react";
import axios from "axios";

const useGetMessages = () => {
  const getMessages = useCallback(async (groupId = null) => {
    if (groupId !== null) {
      localStorage.removeItem("msgs");
    }
    let lastMsgId = null;
    const oldmsgs = JSON.parse(localStorage.getItem("msgs"));
    if (oldmsgs && oldmsgs.length > 0 && groupId === null) {
      lastMsgId = oldmsgs[oldmsgs.length - 1].id;
    }

    try {
      const res = await axios(
        `http://localhost:4000/chat/getmsgs?lastMsgId=${lastMsgId}&groupId=${groupId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      let allMsgs = [];
      if (oldmsgs && oldmsgs.length > 0) {
        allMsgs = [...oldmsgs, ...res.data];
      } else {
        allMsgs = [...res.data];
      }

      if (groupId === null && allMsgs.length > 10) {
        const latestAllMsgs = allMsgs.slice(allMsgs.length - 10);
        localStorage.setItem("msgs", JSON.stringify(latestAllMsgs));
        return latestAllMsgs;
      }
      if (groupId === null) {
        localStorage.setItem("msgs", JSON.stringify(allMsgs));
      }
      return allMsgs;
    } catch (err) {
      console.log(err);
    }
  }, []);
  return getMessages;
};

export default useGetMessages;
