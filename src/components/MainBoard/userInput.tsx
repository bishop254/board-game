import React, { useEffect, useContext, useState } from "react";
import { Board } from "./board";

export default function UserInput() {
  const [input1, setInput1] = useState(""); // '' is the initial row value
  const [input2, setInput2] = useState(""); // '' is the initial column value
  const [flag, setFlag] = useState(false); // flase is the initial flag value. Tells us if form has been submitted.

  // Remove form after user submits and set a flag to true.
  function renderBoard() {
    document.getElementById("userInput")?.remove();
    setFlag(true);
  }

  // Render form.
  // If flag state is true then render the board.
  return (
    <div id="main_board" style={{background: 'lightgreen'}}>
      <form id="userInput" >
        <label>Rows:</label>
        <br />

        <input
          value={input1}
          onInput={(e) => setInput1(e.currentTarget.value)}
        />
        <br />
        <br />

        <label>Columns:</label>
        <br />

        <input
          value={input2}
          onInput={(e) => setInput2(e.currentTarget.value)}
        />
        <br />
        <br />

        <input type="button" value="Submit" onClick={renderBoard} />
      </form>
      {flag && <Board vert1={parseInt(input1)} horz2={parseInt(input2)} />}
    </div>
  );
}
