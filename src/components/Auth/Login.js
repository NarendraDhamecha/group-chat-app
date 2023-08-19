import axios from "axios";
import { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        loginCredentials
      );

      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      history.push("/chat");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account <NavLink to="/signup">Sign Up</NavLink>
      </p>
    </div>
  );
};

export default Login;
