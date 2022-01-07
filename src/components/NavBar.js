import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/NavBar.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    setUser("");
    navigate("/");
  }
  return (
    <div className="NavBar">
      {user.username ? (
        <>
          <Link to="/" type="button">
            Home
          </Link>
          <button type="submit" onClick={logout}>
            log out
          </button>
        </>
      ) : (
        <div>user not signed in</div>
      )}
    </div>
  );
}

export default Navbar;
