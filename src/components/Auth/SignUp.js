import { useRef } from "react";

const SignUp = () => {
  const nameRef = useRef(''); 
  const emailRef = useRef(''); 
  const mobileNoRef = useRef(''); 
  const passwordRef = useRef(''); 

  const submitHandler = (e) => {
     e.preventDefault();
     
     const signUpDetails = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        mobileNo: mobileNoRef.current.value,
        password: passwordRef.current.value
     }

     console.log(signUpDetails)
  }

  return (
    <div>
      <h4>SIGN UP</h4>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Name" ref={nameRef}/>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="number" placeholder="Mobile No" ref={mobileNoRef}/>
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
