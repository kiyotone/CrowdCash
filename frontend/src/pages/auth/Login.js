import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useReducer, useEffect } from "react";
import api from "@/components/stuff/axios";
import { setToken } from "@/components/stuff/helper";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: true,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: true };
  }

  return { value: "", isValid: fasle };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  
  const router = useRouter();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      username: emailState.value,
      password: passwordState.value,
    };

    try {
      const response = await api.post("/auth/token", data);
      console.log(response.data);
      if (response.data.access) {
        setToken(response.data.access);
        router.push("/");
      } else {
        console.log("No token");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(emailState.value, passwordState.value);
  };

  return (
    <div className="flex bg-background_color overflow-hidden h-screen w-screen fixed top-0 left-0 items-center justify-center">
      <div className="w-[24rem]  flex flex-col items-center ">
        <div className="m-4 text-[2rem] font-bold text-primary">Join US</div>

        <div className="mt-2 w-[24rem] h-[1rem]">
          <hr className={` m-3 bg-[#eee]`} />
        </div>
        <div>
          <form
            className="mt-3 flex flex-col items-center"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              placeholder={`${
                emailIsValid === false
                  ? "Enter Valid Email"
                  : "Email or PhoneNo."
              }`}
              className={`pl-4 mt-4 bg-transparent border-2 rounded-md w-[19rem] h-[3rem] border-[#555] outline-1 outline-secondary ${
                emailIsValid === false
                  ? "border-red-600 placeholder:text-red-600"
                  : ""
              }`}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
            <input
              type="password"
              placeholder="Password"
              className={`pl-4 mt-4 bg-transparent border-2 rounded-md outline-secondary w-[19rem] h-[3rem] border-[#555] ${
                passwordIsValid === false
                  ? "border-red-600 placeholder:text-red-600"
                  : ""
              }`}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <button
              className={`pl-4 mt-4 rounded-md w-[19rem] h-[3rem] button bg-button_secondary disabled:bg-gray-400 disabled:cursor-not-allowed text-[#fff]`}
              disabled={!formIsValid}
            >
              Continue
            </button>
          </form>
          <div
            className={`w-[19rem] h-[3rem] flex items-center justify-between text-[.8rem] text-[#727375}]`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                placeholder="Password"
                className={`mr-2 bg-transparent border-2 rounded-md border-[#fff] w-[1rem] h-[1rem]`}
              />
              <label htmlFor="remember"> Remember Me</label>
            </div>

            <div
              className={`text-[#007628] cursor-pointer hover:underline underline-offset-1`}
            >
              Forgot Password?
            </div>
          </div>

          <div className="mb-6 mt-2 flex text-[.9rem]">
            Not a member yet?
            <div
              className="pl-2 text-[#007628] cursor-pointer hover:underline underline-offset-1"
              onClick={() => router.push("/auth/Register")}
            >
              Join now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
