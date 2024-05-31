import React, { useState, createContext } from 'react';

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    username: '',
  });

  const setUserDataState = (isLoggedIn, username) => {
    setUserData({ isLoggedIn, username });
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserDataState }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
