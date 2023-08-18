import { useRef } from "react";
import axios from "axios";

const SignUp = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const mobileNoRef = useRef("");
  const passwordRef = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const signUpDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      mobileNo: mobileNoRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        signUpDetails
      );
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h4>SIGN UP</h4>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Name" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="number" placeholder="Mobile No" ref={mobileNoRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
