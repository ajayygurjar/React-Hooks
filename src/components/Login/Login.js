import React, { useState, useReducer, useEffect,useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";







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


  

//useContext
  const ctx=useContext(AuthContext)

  //Destructuring from object the values of isValid form state object;
  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=passwordState;


  useEffect(()=>{
    const timer=setTimeout(()=>{
     // console.log('Running')
      setFormIsValid(passwordIsValid&& emailIsValid)
      // also could have have used passwordState.isvalid and emailState.isValid;
    },500)

    return ()=>{
      //console.log('CleanUp')
      clearTimeout(timer)
    }
  },[emailIsValid,passwordIsValid])

  // Email input change handler
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });

    // Validate form after email change
    //setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  // Password input change handler
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASS", payload: event.target.value });

    // Validate form after password change
    //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
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
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
