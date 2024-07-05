import React, { useState, createContext, useContext, useRef } from 'react';

// Creazione del contesto
const SearchContext = createContext();

// Componente Provider del contesto
export const SearchProvider = ({ children }) => {
  const [fixedPosition, setFixedPosition] = useState(false);
  const [searchState, setSearchState] = useState({ inputActive: false });
  
  const inputRef = useRef(null)

  return (
    <SearchContext.Provider value={{ fixedPosition, setFixedPosition, searchState, setSearchState, inputRef }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useSearchContext = () => {
  return useContext(SearchContext);
};