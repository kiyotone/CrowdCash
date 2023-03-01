import FormContainer from "@/UI/formContainer";
import PhoneInput from "react-phone-input-2";
import { useState, useSelector, useEffect } from "react";
import Terms from "@/components/Terms";
import api from "@/components/stuff/axios"; // Axios instance
import { setToken } from "@/components/stuff/helper"; // Set token in local storage
import { useRouter } from "next/router"; // Router
import { useDispatch } from "react-redux";
import { changeUser } from "@/components/redux/features/userSlicer";

const Register = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch()

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [error,setError] = useState("");


  const clickedterms = (e) => {
    if (isTermsOpen) {
      if (e.target.id == "termsID") {
        setIsTermsOpen(false);
      }
    } else {
      setIsTermsOpen(true);
    }
  };

  const registerPageSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      dob: dob,
      email: email
    }
    
    try {
    const response = await api.post("/auth/register", data);
    if (response.status == 201) {
      // Registration successful
      setToken(response.data.access)
      router.push("/")
    } else {
      console.log("UsernameAlreadyTaken")
      setError("Username Already Taken")
    
    }
    }
    catch(error){
    
      console.log(error)
    
      if (error.response.status == 409){
      console.log("UsernameAlreadyTaken")
      setError("Something Already Taken")
    }
      
      else if (error.response.status ==400) {
        console.log("Form Not completely filled")
        setError("Form Not Completely Filled")
      }
          
      }
    }

  

  return (
    <div className="h-screen w-screen bg-background_color flex items-center justify-center text-secondary relative">
      <div>
        <div className="text-primary text-2xl font-semibold p-4 text-center">
          Register
        </div>


        <div className="text-red-600">{error}</div>

        <div className="mt-2 w-[24rem] h-[1rem]">
          <hr className={` m-3 bg-secondary`} />
        </div>

        <form onSubmit={registerPageSubmit} className="flex gap-4 flex-col">
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <label>First Name</label>
              <input onChange={(e)=>setFirstName(e.target.value)} className="form_input" type="text"></input>
            </div>

            <div className="flex flex-col gap-1">
              <label>Last Name</label>
              <input onChange={(e)=>setLastName(e.target.value)} className="form_input" type="text" ></input>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label>Address</label>
            <input onChange={(e)=>setAddress(e.target.value)} className="form_input" type="text"></input>
          </div>

          <div className="flex flex-col gap-1">
            <label>E-Mail</label>
            <input onChange={(e)=>setEmail(e.target.value)} className="form_input" type="email"></input>
          </div>

          <div className="flex gap-2">
            <PhoneInput
              country={"np"}
              inputClass="form_input"
              countryCodeEditable={false}
              onChange={(e)=>setPhone(e)}
            />
            <div className="flex flex-col w-full">
              <lable>Date of Birth(B.S)</lable>
              <input onChange={(e)=>setDob(e.target.value)} className="form_input" type="date"></input>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label>Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} className="form_input" type="text"></input>
          </div>

          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className="form_input" type="password"></input>
          </div>

          <div className="flex flex-col gap-1">
            <label>Uplode Photo</label>
            <input type="file" />
          </div>

          <div className="flex flex-col gap-1">
            <label>Uplode Photo of Citizenship</label>
            <input  type="file" />
          </div>

          <div className="flex items-center gap-2">
            <input  type="checkbox" />
            <span>
              Agree to{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={clickedterms}
              >
                Terms & Condition
              </span>
            </span>
          </div>

          <button
            className={`bg-button_secondary rounded-lg py-2 text-[#333]  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-[#fff]`}
            disabled={!formIsValid}
          >
            Submit
          </button>
        </form>
      </div>
      {isTermsOpen && (
        <div
          id="termsID"
          className="absolute h-screen flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] w-screen justify-center"
          onClick={(e) => clickedterms(e)}
        >
          <Terms />
        </div>
      )}
    </div>
  );
};

export default Register;
