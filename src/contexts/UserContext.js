import React, { useState, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const initialState = {
    user: { username: "", id: 0 },
  };
  const [user, setUser] = useState(initialState.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
