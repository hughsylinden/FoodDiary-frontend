import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "../styles/NavBar.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.loggedInUser) {
      setUser(JSON.parse(localStorage.loggedInUser));
    }
  }, []);

  async function logout() {
    setUser({ username: "", accessToken: "", id: "" });
    localStorage.clear();
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
