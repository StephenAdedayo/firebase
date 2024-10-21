import React, { useEffect, useState } from "react";
import {
  signInWithApple,
  signInWithGoogle,
  sendOtp,
  auth,
} from "../../firebase";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import parsePhoneNumberFromString from "libphonenumber-js";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("Sending OTP..."); // Check if this logs

    if (!phoneNumber) {
        alert("Please enter a valid phone number");
        return;
    }

    // Format the phone number
    const phoneNumberObject = parsePhoneNumberFromString(phoneNumber);
    if (!phoneNumberObject) {
        alert("Invalid phone number format. Please enter a valid phone number.");
        return;
    }

    const formattedPhoneNumber = phoneNumberObject.format('E.164'); // Format to E.164

    try {
        const user = await sendOtp(formattedPhoneNumber); // Pass the formatted phone number
        console.log(user); // Check if the user is returned properly

        if (!user) {
            return;
        }
        navigate("/home");
    } catch (error) {
        console.log(error.message);
    }
};
  const handleGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      console.log(user);

      if (!user) {
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleApple = async () => {
    try {
      const user = await signInWithApple();
      if (!user) {
        return;
      }
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        navigate("/home");
      } else {
        console.log("logged out");
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="form">
     <form onSubmit={handleSendOtp}>
  <input
    type="text"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    placeholder="Enter phone number"
  />
  <button type="submit">Send OTP</button>
</form>

      <button onClick={handleApple}>SignIn with Apple</button>

      <button onClick={handleGoogle}>SignIn with Google</button>
      
        <Link to='/create'>create an account</Link>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
