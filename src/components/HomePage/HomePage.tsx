import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");

  const outputField = document.getElementById("output") as HTMLDivElement;

  function generateRandom() {
    const maxNumber = Number(max);
    const random = Math.floor(Math.random() * maxNumber);
    outputField.innerText = `${random}`;
  }

  return (
    <div className="parent">
      <h1>Randomizer</h1>
      <div className="input-block">
        <input id="field1" type="number" value={min} onChange={e => setMin(e.target.value)} placeholder="0"/>
        <input id="field2" type="number" value={max} onChange={e => setMax(e.target.value)} placeholder="50"/>
      </div>
      <button id="generateBtn" onClick={generateRandom}>Generate</button>
      <div id="output" />
    </div>
  );
}

export default HomePage;