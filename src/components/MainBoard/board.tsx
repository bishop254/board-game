import React, {  useEffect, useState } from "react";
import Tile from "../Tiles/tile";
import "./board.css";

interface Props {
  vert1: number,
  horz2: number
}

export function Board({ vert1, horz2 }: Props) {
  // Set board width and height based on what the user input.

  useEffect(() => {
    let factor = 40;
    let vert = (vert1 * factor).toString();
    let horz = (horz2 * factor).toString();
    document.documentElement.style.setProperty("--board-width", `${horz}px`);
    document.documentElement.style.setProperty("--board-height", `${vert}px`);
    document.documentElement.style.setProperty(
      "--tile-width",
      `${factor.toString()}px`
    );
    document.documentElement.style.setProperty(
      "--tile-height",
      `${factor.toString()}px`
    );
    document.documentElement.style.setProperty(
      "--rows-for-tile",
      horz2.toString()
    );
    document.documentElement.style.setProperty(
      "--cols-for-tile",
      vert1.toString()
    );
  }, []);

  // Assign a boilerplate to store player variables like moves taken
  interface Player {
    moves: number;
    x: number;
    y: number;
    image?: string;
    treatsEaten: number;
  }

  // Assign a boilerplate to store the location of a treat
  interface Treats {
    x: number;
    y: number;
    image: string;
  }

  // Declare and initialize two arrays
  // One holds our player while the other holds our treats and their details
  const player: Player[] = [];
  const treat: Treats[] = [];

  // Create our player (initialize our player)
  player.push({
    moves: 0,
    x: Math.floor(vert1 / 2),
    y: Math.floor(horz2 / 2),
    image: "assets/playerX.png",
    treatsEaten: 0,
  });

  let count = vert1 > horz2 ? vert1 : horz2;  // gives us a limit of how many treats to add
  console.log(count)
  // Create our treats choosing random coordinates as their initial position
  for (let i = 0; i < count; i++) {
    treat.push({
      x: Math.floor(Math.random() * vert1 + 1),
      y: Math.floor(Math.random() * horz2 + 1),
      image: "assets/treat.png",
    });
  }

  let main_board = [];
  let playerX: number; // Save x-coords of player temporarily.
  let playerY: number; // Save y-coords of player temporarily.
  let treatCount: number = 0;

  // Based on user input(vert1, horz2) create a board of a specific size placing a green tile on each loop
  for (let i = 1; i <= vert1; i++) {
    for (let j = 1; j <= horz2; j++) {
      let tileId = `${i}:${j}`.toString(); // Gives each tile a unique ID(coordinates).
      let image = undefined;
      let isPlayerTile = false; // Check if that tile has the player.

      // Place the player roughly at the center
      if (i === Math.floor(vert1 / 2) && j === Math.floor(horz2 / 2)) {
        playerX = i;
        playerY = j;

        player.forEach((p) => {
          image = p.image;
          isPlayerTile = true;
        });
      }

      
      // For each treat, place it in the board and ensure it isn't placed on the player's tile.
      treat.forEach((t) => {
        if ((i === t.x && j === t.y) && ( t.x !== playerX && t.y !== playerY)) {
          image = t.image;
          treatCount++;
        }
      });

      // Create the tiles
      main_board.push(
        <Tile
          cN={isPlayerTile.toString()}
          image={image}
          id={tileId}
          key={tileId}
        />
      );
    }
  }

  // Catch Arrow Keys keyboard press.
  function moveP(e: React.KeyboardEvent) {
    let currDiv;
    let nextdiv;
    const elem = e.target as HTMLElement;

    // Updates the players variables.
    function updatePlayer(target: HTMLElement) {
      let intX = target.id[0];
      let intY = target.id[2];
      player[0].x = parseInt(intX, 10);
      player[0].y = parseInt(intY, 10);
    }

    //check if nextDiv has a treat, remove it if true
    function checkTreat(target: HTMLElement) {
      if (target.children.length > 1) {
        let treat = target.lastChild;
        treat?.remove();
        return true;
      }
    }

    // Check if player has eaten all treats then display a message if true.
    function finish() {
      console.log(treatCount, '...', player[0].treatsEaten)
      if (player[0].treatsEaten === treatCount) {
        let mainApp = document.getElementsByName("App");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `It has taken you ${player[0].moves} moves to eat all treats`;
        document.getElementById("main_board")?.replaceWith(newDiv);
      }
    }

    // Check which arrow key is pressed and change the player position
    if (e.key === "ArrowUp") {
      // currDiv = document.getElementById(`${playerX}:${playerY}`);
      nextdiv = document.getElementById(`${playerX - 1}:${playerY}`); // Get tile above player
      let imgDiv = document.getElementById("true"); // Get the image with id of true(player)

      // if player and tile above are present, 
      // then add player to tile above and update the variable playerX.
      // Check for treats and also if player has eaten all treats.
      if (imgDiv && nextdiv) {
        nextdiv.prepend(imgDiv);
        playerX -= 1;
        player[0].moves += 1;
        updatePlayer(nextdiv);
        if (checkTreat(nextdiv)) {
          player[0].treatsEaten += 1;
          finish();
        }
        console.log(player);
      }
    } else if (e.key === "ArrowDown") {
      nextdiv = document.getElementById(`${playerX + 1}:${playerY}`);
      console.log(nextdiv);
      let imgDiv = document.getElementById("true");
      if (imgDiv && nextdiv) {
        nextdiv.prepend(imgDiv);
        playerX += 1;
        player[0].moves += 1;
        updatePlayer(nextdiv);

        if (checkTreat(nextdiv)) {
          player[0].treatsEaten += 1;
          finish();
        }
      }
    } else if (e.key === "ArrowLeft") {
      nextdiv = document.getElementById(`${playerX}:${playerY - 1}`);
      let imgDiv = document.getElementById("true");
      if (imgDiv && nextdiv) {
        nextdiv.prepend(imgDiv);
        playerY -= 1;
        player[0].moves += 1;
        updatePlayer(nextdiv);

        if (checkTreat(nextdiv)) {
          player[0].treatsEaten += 1;
          finish();
        }
      }
    } else if (e.key === "ArrowRight") {
      nextdiv = document.getElementById(`${playerX}:${playerY + 1}`);
      console.log(nextdiv);
      let imgDiv = document.getElementById("true");
      if (imgDiv && nextdiv) {
        nextdiv.prepend(imgDiv);
        playerY += 1;
        player[0].moves += 1;
        updatePlayer(nextdiv);

        if (checkTreat(nextdiv)) {
          player[0].treatsEaten += 1;
          finish();
        }
      }
    }
  }

  // Render the main board and listen for keyboard presses.
  return (
    <div id="main_board" onKeyDown={(e) => moveP(e)} tabIndex={0}>
      {main_board}
    </div>
  );
}
