import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    const loginCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(loginCredentials);
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
