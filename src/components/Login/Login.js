import React, { useState, useReducer, useEffect,useContext,useRef } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from '../UI/Input/Input'







// Email reducer
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// Password reducer
const passwordReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  // Using useReducer for email and password states
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
/*
  // useRef for focusing on email during first render

  const emailRef=useRef(null);
  

  useEffect(()=>{
    emailRef.current.focus();
  },[])
*/


  

//useContext
  const ctx=useContext(AuthContext)

  
  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;


  const emailInputRef=useRef();
  const passwordInputRef=useRef();



  useEffect(()=>{
    const timer=setTimeout(()=>{
     
      setFormIsValid(passwordIsValid&& emailIsValid)
     
    },500)

    return ()=>{
     
      clearTimeout(timer)
    }
  },[emailIsValid,passwordIsValid])

  // Email input change handler
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });

    
  };

  // Password input change handler
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASS", payload: event.target.value });

    
  };

  // Email input blur handler
  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  // Password input blur handler
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  // Form submission handler
  const submitHandler = (event) => {

    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);  
    }
    else if(!emailIsValid){
      emailInputRef.current.focus()

    }else{
      passwordInputRef.current.focus()

    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input  
        ref={emailInputRef}
        id='email' 
        type='email' 
        label='E-mail'
        value={emailState.value} 
        onChange={emailChangeHandler}
         onBlur={validateEmailHandler}
         isValid={emailIsValid}
         />
        <Input  
        ref={passwordInputRef}
        id='password' 
        type='password' 
        label='Password'
        value={passwordState.value} 
        onChange={passwordChangeHandler}
         onBlur={validatePasswordHandler}
         isValid={passwordIsValid}
         />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
