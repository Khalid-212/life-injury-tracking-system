import React from 'react';
import { StoreContext, useStore } from '@/app/context/store'

function Counter() {
  const { Data, setData } = useStore();

  const logData = () => {
      console.log('Data in context:', Data);
    };
  const increment = () => {
    // Use setData to update the state
    setData(Data + 1);
    logData();
  };

  const decrement = () => {
    // Use setData to update the state
    setData(Data - 1);
};

  return (
    <div>
      <p>Counter Value: {Data}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
