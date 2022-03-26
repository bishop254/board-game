# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
No real tests have been implemented yet.


# Introduction
This react app is a game based on a player moving across a board while eating treats.
It displays the steps taken after all treats are eaten.
Typescript is the template used for creating the various components.
Still in its early stages. has some minor errors.

## Roadmap
It has three main components:
### UserInput
Takes in user input used to define the width and height of our board.
### Board 
Houses our board and is called after UserInput components gets the measurements of our board.
Listens for key presses and repositions the player accordingly.
Deletes a treat from the board if player moves to the tile containing that treat.
### Tile
A tile can hold an image and is used to track movement of the player based on div ID.
Tiles are rendered in a nested for loop that takes in the width and height input by the user.

## Logic
If the up arrow key is pressed then take the div ID of the div holding the player
and decrement the row portion of the ID by one.
The sme logic covers all other directions.






