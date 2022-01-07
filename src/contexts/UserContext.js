import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

function UserProvider({ children }) {
  const initialState = {
    user: { username: "", id: 0 },
  };
  const [user, setUser] = useState(initialState.user);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
