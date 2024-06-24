import React, { useState } from "react";
import "./App.css";

function App() {
  
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");

  const outputField = document.getElementById("output") as HTMLElement;

  function generateRandom() {
    const maxNumber = Number(max);
    const random = Math.floor(Math.random() * maxNumber);
    outputField.innerText = `${random}`;
  }

  return (
    <>
      <div>
        <input id="field1" type="number" value={min} onChange={e => setMin(e.target.value)} placeholder="0"/>
        <input id="field2" type="number" value={max} onChange={e => setMax(e.target.value)} placeholder="50"/>
      </div>
      <button onClick={generateRandom}>Generate</button>
      <div id="output" />
    </>
  );
}

export default App;
