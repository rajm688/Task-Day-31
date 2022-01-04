import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import { Cards } from "./Cards";
import { Addpoke } from "./Addpoke";
export default function App() {
  return(
  <PokeList/>
  )
}

function PokeList(){
  const getPoke =   () =>
 fetch("https://61c412fdf1af4a0017d99285.mockapi.io/Pokemon",{method:"GET"})
   .then((data) => data.json())
   .then((poke) => setData(poke));
  useEffect(getPoke,[]);
  const deletepoke = (id)=>fetch(`https://61c412fdf1af4a0017d99285.mockapi.io/Pokemon/${id}`,{method:"DELETE"}).then((data) => data.json()).then(()=>getPoke())
  const [datas, setData] = useState([]);
  console.log(datas);
  return (
    <div >
        <Typography
          className="heading"
          gutterBottom
          variant="h5"
          component="div"
        >
          Welcome to the Rarest{" "}
          <img
            className="pokimg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
            alt="pokimon"
          />{" "}
          Collection! Feel free to add your favourite{" "}
          <img
            className="pokimg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
            alt="pokimon"
          />{" "}
          and alter the collection as you see fit.
        </Typography>
      <div>
        <Addpoke datas={datas}/>
      </div>
      <div className="App">
      {datas.map(({ name, power, weakness, img, description, id }) => (
        <Cards
          name={name}
          power={power}
          weakness={weakness}
          img={img}
          description={description}
          deleteButton={<IconButton onClick={()=>{deletepoke(id)}}><DeleteIcon/></IconButton>}
        />
      ))}
    </div>
    </div>
  );
}