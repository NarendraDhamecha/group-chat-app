import axios from "axios";
import { useRef, useState } from "react";

const Group = () => {
  const groupRef = useRef("");
  const membersRef = useRef("");
  const [createGrp, setCreateGrp] = useState(false);
  const [groups, setGroups] = useState([]);
  const members = [];

  const onNewGroup = () => {
    setCreateGrp(!createGrp);
  };

  const onAddMember = () => {
    members.push(membersRef.current.value);
    console.log(members);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const groupDetails = {
      groupName: groupRef.current.value,
      members,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/group/creategroup",
        groupDetails,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGroups((prevGrps) => [...prevGrps, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={onNewGroup}>{`${
        !createGrp ? "Create new group" : "Close"
      }`}</button>
      {createGrp && (
        <div>
          <input
            type="email"
            placeholder="Enter the email Id of Users to Add"
            ref={membersRef}
          />
          <button onClick={onAddMember}>Add member</button>
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Group name" ref={groupRef} />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
      <div>
        {groups.map((group) => {
          return <p key={group.id}>{group.name}</p>
        })}
      </div>
    </div>
  );
};

export default Group;
