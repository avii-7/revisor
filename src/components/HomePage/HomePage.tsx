import React, { useState } from "react";
import "./HomePage.css";
import ListItem from "../ListItem/ListItem";
import PlusSolid from "../../Assets/PlusSolid";


const HomePage = () => {
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");

  const peoples = [
    {
      id: 0, // Used in JSX as a key
      name: "Creola Katherine Johnson",
      profession: "mathematician",
      accomplishment: "spaceflight calculations",
      imageId: "MK3eW3A",
    },
    {
      id: 1, // Used in JSX as a key
      name: "Mario José Molina-Pasquel Henríquez",
      profession: "chemist",
      accomplishment: "discovery of Arctic ozone hole",
      imageId: "mynHUSa",
    },
    {
      id: 2, // Used in JSX as a key
      name: "Mohammad Abdus Salam",
      profession: "physicist",
      accomplishment: "electromagnetism theory",
      imageId: "bE7W1ji",
    },
    {
      id: 3, // Used in JSX as a key
      name: "Percy Lavon Julian",
      profession: "chemist",
      accomplishment:
        "pioneering cortisone drugs, steroids and birth control pills",
      imageId: "IOjWm71",
    },
    {
      id: 4, // Used in JSX as a key
      name: "Subrahmanyan Chandrasekhar",
      profession: "astrophysicist",
      accomplishment: "white dwarf star mass calculations",
      imageId: "lrWQx8l",
    },
  ];

  const outputField = document.getElementById("output") as HTMLDivElement;

  function generateRandom() {
    const maxNumber = Number(max);
    const random = Math.floor(Math.random() * maxNumber);
    outputField.innerText = `${random}`;
  }

  const onAddClick = () => {
    
  }

  return (
    <div className="parent">
      <header>
        <div className="header-title">
          <h1>Randomizer</h1>
        </div>
        <div className="header-add" onClick={onAddClick}>
          <PlusSolid width={30} height={30} />
        </div>
      </header>
      <div className="input-block">
        <input
          id="field1"
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          placeholder="0"
        />
        <input
          id="field2"
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="50"
        />
      </div>
      <button id="generateBtn" onClick={generateRandom}>
        Generate
      </button>
      <div id="output" />
      <div>
        {peoples.map((val) => (
          <ListItem
            key={val.id}
            index={val.id}
            isChecked={false}
            title={val.name}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
