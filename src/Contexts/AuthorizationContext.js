import React, { useState, createContext } from "react";

export const AuthorizationContext = createContext();

export const AuthorizationProvider = (props) => {
  const [authorised, setauthorised] = useState(true);

  return (
    <AuthorizationContext.Provider value={[authorised, setauthorised]}>
      {props.children}
    </AuthorizationContext.Provider>
  );
};
