'use client'

import { createContext, useContext, useState } from "react";


export const StoreContext = createContext("");

export const StoreProvider = ({ children }) => {
    const [Data, setData] = useState({});
    const addData=(newData)=>{
        setData(newData);
    }

  return (
    <StoreContext.Provider value={({Data,addData})}>
      {children}
    </StoreContext.Provider>
  );
}


export const useStore = () => useContext(StoreContext);
