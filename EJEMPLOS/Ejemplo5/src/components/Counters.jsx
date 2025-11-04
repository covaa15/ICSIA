import { useState, useRef } from 'react';

function Counters() {
  // const [counter1, setCounter1] = useState(0);
  const counter1 = useRef(0);
  const counterRef = useRef(0);
  let counter2 = 0;

  function changeCountersHandler() {
    // setCounter1(1);
    counter1.current = 1;
    counter2 = 1;
    counterRef.current = 1;
    // counter1 con ref no se ve en la UI hasta que se fuerza una re-renderización
    // console.log('Counter 1 value:', counter1.current);
  }

  return (
    <>
      <button onClick={changeCountersHandler}>Change Counters</button>
      <ul>
        {/* <li>Counter 1: {counter1}</li> */}
        <li>Counter 1: {counter1.current}</li>
        <li>Counter 2: {counter2}</li>
        <li>Counter 3: {counterRef.current}</li>
      </ul>
    </>
  );
}

export default Counters;
