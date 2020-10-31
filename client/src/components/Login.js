import axios from "axios";
import React, { useState } from "react";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [toggleLog, setToggleLog] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
      setToggleLog(false);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <section>
      <h1 className="title">NOTE APP</h1>
      {!toggleLog ? (
        <div className="login create_note_container">
          <h2>Login</h2>
          <form onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Password"
              required
              value={user.password}
              autoComplete="on"
              onChange={onChangeInput}
            />
            <button type="submit">Login</button>
            <p>
              You don't have an account?
              <span onClick={() => setToggleLog(true)}> Register Now</span>
            </p>
            <h3>{err}</h3>
          </form>
        </div>
      ) : (
        <div className="register create_note_container">
          <h2>Register</h2>
          <form onSubmit={registerSubmit}>
            <input
              type="name"
              name="name"
              id="register-name"
              placeholder="User Name"
              required
              value={user.name}
              onChange={onChangeInput}
            />
            <input
              type="email"
              name="email"
              id="register-email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="Password"
              required
              value={user.password}
              autoComplete="true"
              onChange={onChangeInput}
            />
            <button type="submit">Register</button>
            <p>
              You already have an account?
              <span onClick={() => setToggleLog(false)}> Login Now</span>
            </p>
            <h3>{err}</h3>
          </form>
        </div>
      )}
    </section>
  );
};

export default Login;
