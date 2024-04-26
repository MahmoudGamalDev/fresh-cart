import { createContext, useState } from "react";

export const userContext = createContext(null);

export function UserContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [Login, setLogin] = useState(null);
  let [isOpen, setOpen] = useState(false);

  return (
    <userContext.Provider
      value={{ user, setUser, Login, setLogin, isOpen, setOpen }}
    >
      {children}
    </userContext.Provider>
  );
}
