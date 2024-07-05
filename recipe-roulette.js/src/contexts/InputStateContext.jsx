import React, { createContext, useContext, useRef } from 'react';

// Creazione del contesto
const SearchContext = createContext();

// Componente Provider del contesto
export const SearchProvider = ({ children }) => {
  
  const inputRef = useRef(null)

  return (
    <SearchContext.Provider value={{ inputRef }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useSearchContext = () => {
  return useContext(SearchContext);
};