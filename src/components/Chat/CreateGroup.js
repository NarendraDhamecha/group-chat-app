import axios from "axios";
import { useRef, useState } from "react";
import ModalOverlay from "../UI/ModalOverlays";

const CreateGroup = (props) => {
  const { closeModal } = props;
  const groupRef = useRef("");
  const membersRef = useRef("");
  const [members, setMembers] = useState([]);

  const onAddMember = () => {
    setMembers(prevMembers => [...prevMembers, membersRef.current.value]);
  };

  const submitHandler = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalOverlay>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Create new group</h5>
            <button onClick={closeModal} class="btn-close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Group name"
                  ref={groupRef}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="enter the email Id of users to add"
                  ref={membersRef}
                />
              </div>
            </form>
            <ul>
              {members.map((member) => {
                return <li key={member}>{member}</li>
              })}
            </ul>  
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary btn-sm mt-1"
              onClick={onAddMember}
            >
              Add member
            </button>
            <button className="btn btn-success btn-sm" onSubmit={submitHandler}>
              Create Group
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CreateGroup;
