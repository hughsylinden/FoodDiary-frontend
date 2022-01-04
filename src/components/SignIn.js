import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { signin } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const initialState = {
    fields: { username: "", password: "" },
  };
  const [fields, setFields] = useState(initialState.fields);
  const { setUser } = useContext(UserContext);

  let navigate = useNavigate();

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  function handleLoginUser(e){
    e.preventDefault()
    signin(fields.username,fields.password).then(res => {
      if(res.username){
        setUser({
          id:res.id,
          username:res.username,
          password:res.password,
        })
        navigate("/");

      }
    });    
  }

  
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleLoginUser}>
        username <input type="text" name="username" onChange={handleFieldChange}/>
        password <input type="password" name="password" onChange={handleFieldChange}/><br/>
        <button>sign in</button><br/>
        not a user? sign up <Link
            to="/signup"
            type="button"
          >
            here
          </Link>
      </form>
    </div>
  )
}

export default SignIn
