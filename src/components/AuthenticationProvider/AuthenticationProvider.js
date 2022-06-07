import { useContext, createContext, useState } from 'react';

const AuthneticationContext = createContext();

export const AuthneticationContextProvider = ({ children }) => {
  const initialIsUserAuthenticated = !!localStorage.getItem('is_authenticated');

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    initialIsUserAuthenticated,
  );

  const setIsAuthenticated = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated);

    localStorage.setItem('is_authenticated', 'true');
  };

  return (
    <AuthneticationContext.Provider
      value={{
        isUserAuthenticated: isUserAuthenticated,
        setIsUserAuthenticated: setIsAuthenticated,
      }}
    >
      {children}
    </AuthneticationContext.Provider>
  );
};

export const useAuthneticationContext = () => useContext(AuthneticationContext);
