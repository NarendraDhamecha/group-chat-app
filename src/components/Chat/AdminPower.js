import { useState } from "react";
import ModalOverlay from "../UI/ModalOverlays";
import { useRef } from "react";
import axios from "axios";

const AdminPower = (props) => {
  const {group, closeModal} = props 
  const [members, setMembers] = useState([]);
  const membersRef = useRef("");

  const onAddMember = () => {
    setMembers((prevMem) => [...prevMem, membersRef.current.value])
  }

  const submitHandler = async () => {
    let URL = `http://localhost:4000/group/addmember`
    if(group.title === 'Make Admin'){
      URL = `http://localhost:4000/group/makeadmin`
    }

    const details = {
      members: members,
      group: group
    }

     try{
       const response = await axios.post(URL, details, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
       })
       console.log(response);
     }
     catch(err){
        console.log(err);
     }
  }

  return (
    <ModalOverlay>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{group.title}</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form>
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
                return <li key={member}>{member}</li>;
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button onClick={onAddMember} className="btn btn-primary">Add</button>
            <button onClick={submitHandler} className="btn btn-success">Done</button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default AdminPower;
