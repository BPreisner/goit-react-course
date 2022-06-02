import { useContext, createContext, useState } from 'react';

const AuthneticationContext = createContext();

export const AuthneticationContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  return (
    <AuthneticationContext.Provider
      value={{
        isUserAuthenticated: isUserAuthenticated,
        setIsUserAuthenticated: setIsUserAuthenticated,
      }}
    >
      {children}
    </AuthneticationContext.Provider>
  );
};

export const useAuthneticationContext = () => useContext(AuthneticationContext);
