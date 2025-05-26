import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./ForgotPass.css";
import { enqueueSnackbar } from "notistack";

const ForgotPass = () => {
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
  });

  const { forgotPassword } = useContext(AuthContext);

  const onHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { email, answer } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Enter a valid email", { variant: "error" });
      return;
    }

    if (answer.length < 2) {
      enqueueSnackbar("Security answer is too short", { variant: "error" });
      return;
    }

    forgotPassword(formData);
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={submitHandler}>
        <div className="reset-wrapper flex items-center justify-center overflow-hidden">
          <div className="block absolute bg-black rounded-[50px_5px] inset-1 p-[50px_40px] z-10">
            <h3 className="pass ">FORGOT PASSWORD</h3>
            <div className="mt-7 relative flex items-center justify-start">
              <MailOutlineIcon className="ml-3 text-white " />
              <input
                type="email"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Email"
                name="email"
                onChange={onHandleChange}
                required
              />
            </div>
            <div className="mt-10 relative flex items-center justify-start">
              <AccountBalanceIcon className="ml-3 text-white" />
              <input
                type="text"
                className="w-full h-8 bg-transparent border-b border-white text-white placeholder:text-[#3CBDB1] placeholder:text-sm placeholder:tracking-wider pl-2 text-lg outline-none"
                placeholder="Your first School"
                name="answer"
                onChange={onHandleChange}
                required
              />
            </div>
            <div className="relative ">
              <button type="submit" className="reset absolute ">
                SEND RESET LINK
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
