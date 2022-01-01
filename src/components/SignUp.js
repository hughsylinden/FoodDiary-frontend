import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { signup } from "../utils/auth";
import { Link} from "react-router-dom";

function SignUp() {
  const initialState = {
    fields: { username: "", password: "" },
  };
  const [fields, setFields] = useState(initialState.fields);

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  function handleCreateUser(e){
    e.preventDefault()
    signup(fields.username,fields.password);
    console.log(fields)
  }

  
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleCreateUser}>
        username <input type="text" name="username" onChange={handleFieldChange}/>
        password <input type="password" name="password" onChange={handleFieldChange}/><br/>
        <button>sign up</button><br/>
        already a user? sign in <Link
            to="/signin"
            type="button"
          >
            here
          </Link>
      </form>
    </div>
  )
}

export default SignUp
