import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { signin } from "../utils/auth";

function SignIn() {
  const initialState = {
    fields: { username: "", password: "" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const { setUser } = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  async function handleLoginUser(e) {
    e.preventDefault();
    /* await signin(fields.username, fields.password).then((res) => {
      if (res.username) {
        const loggedInUser = {
          id: res.id,
          username: res.username,
          password: res.password,
        };
        setUser(loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        navigate("/");
      }
    }); */
    await signin(fields.username, fields.password, setUser);
    // navigate("/");
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleLoginUser}>
        username{" "}
        <input type="text" name="username" onChange={handleFieldChange} />
        password{" "}
        <input type="password" name="password" onChange={handleFieldChange} />
        <br />
        <button type="submit">sign in</button>
        <br />
        not a user? sign up{" "}
        <Link to="/signup" type="button">
          here
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
