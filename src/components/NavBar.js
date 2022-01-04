import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../contexts/UserContext";
import "../styles/NavBar.css"


const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  async function logout(){
    setUser("")
  }
  return (
    <div className="NavBar">
      {user.username ? <><Link
              to={`/`}
              type="button"
            >
              Home
          </Link><button onClick={logout}>log out</button></> : <div>user not signed in</div> }
    </div>
  );
}

export default Navbar;
