import React, { useState } from "react";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={email} />

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" value={password} />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
