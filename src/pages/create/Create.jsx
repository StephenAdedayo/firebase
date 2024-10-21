import React, { useEffect, useState } from "react";
import "./create.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUser, loginWithEmail } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [sign, setSign] = useState("signIn");

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev, // Spread the previous state
      [name]: value, // Update the field based on the name attribute
    }));

    // setForm({...form, [name] : value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sign === "signUp") {
      await createUser(form.name, form.email, form.password);
    } else {
      await loginWithEmail(form.email, form.password);
    }
  };

  return (
    <div>
      <form id="steve">
        <p>{sign}</p>

        {sign === "signIn" ? (
          <></>
        ) : (
          <input
            name="name"
            value={form.name}
            onChange={onChangeHandler}
            placeholder="enter your name"
            type="text"
          />
        )}
        <input
          name="email"
          value={form.email}
          onChange={onChangeHandler}
          placeholder="enter your email"
          type="email"
        />
        <input
          name="password"
          value={form.password}
          onChange={onChangeHandler}
          placeholder="enter your password"
          type="password"
        />

        <button onClick={handleSubmit} type="submit">
          {sign}
        </button>

        {sign === "signIn" ? (
          <p onClick={() => setSign("signUp")}>SignUp</p>
        ) : (
          <p onClick={() => setSign("signIn")}>Sign In</p>
        )}
      </form>
    </div>
  );
};

export default Create;
