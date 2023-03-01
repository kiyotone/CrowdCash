import FormContainer from "@/UI/formContainer";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import Terms from "@/components/Terms";

const Register = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const clickedterms = () => {
    if (isTermsOpen) setIsTermsOpen(false);
    else setIsTermsOpen(true);
  };
  return (
    <div className="h-screen w-screen bg-background_color flex items-center justify-center text-secondary relative">
      <div>
        <div className="text-primary text-2xl font-semibold p-4 text-center">
          Register
        </div>

        <div className="mt-2 w-[24rem] h-[1rem]">
          <hr className={` m-3 bg-secondary`} />
        </div>

        <form className="flex gap-4 flex-col">
          <div className="flex gap-2">
            <FormContainer label="First Name" />
            <FormContainer label="Last Name" />
          </div>

          <FormContainer label="Address" />

          <PhoneInput
            country={"np"}
            inputClass="form_input"
            countryCodeEditable={false}
          />

          <FormContainer label="Citizenship No." />

          <div className="flex flex-col gap-1">
            <label>Uplode Photo</label>
            <input type="file" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Uplode Photo of Citizenship</label>
            <input type="file" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" />
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

          <button className="bg-button_secondary rounded-lg py-2 text-[#333]">
            Submit
          </button>
        </form>
      </div>
      {isTermsOpen && (
        <div
          className="absolute h-screen flex items-center bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.8)] w-screen justify-center"
          onClick={clickedterms}
        >
          <Terms />
        </div>
      )}
    </div>
  );
};

export default Register;