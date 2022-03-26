import React, { useEffect, useContext } from "react";
import "./tile.css";
import { PlayerContext } from "../../Context/player";

// Stores image, id and className (denoted as cN)
interface Props {
  image?: string;
  id: string;
  cN: string;
}


export default function Tile({id, image, cN}: Props) {
 
  // if image is not null then render an image on a tile.
  return (
    <div className='tile' id={id}> 
      {image && <div className={`img ${cN}`} id={`${cN}`} style={{backgroundImage: `url(${image})`}}></div>} 
    </div>
  );
}
