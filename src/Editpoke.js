import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export function Editpoke() {
  // const { id } = useParams();
  const id = 1;
  const [datas, setData] = useState(null);
  const getPoke = () =>
    fetch(`https://61c412fdf1af4a0017d99285.mockapi.io/Pokemon/:id`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((poke) => setData(poke));
  useEffect(getPoke, []);
  console.log({ id });
  console.log(datas);
  return datas ? <Updatepoke datas={datas} /> : " ";
}
function Updatepoke({ datas }) {
  const [name, setName] = useState(datas.name);
  const [power, setPower] = useState(datas.power);
  const [weakness, setWeakness] = useState(datas.weakness);
  const [img, setImg] = useState(datas.img);
  const [description, setDescription] = useState(datas.description);
  const history = useHistory();
  return (
    <div>
      <div className="main">
        <div className="inputfield">
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="standard-basic"
            label="Name"
            variant="standard"
          />
          <TextField
            value={power}
            onChange={(e) => {
              setPower(e.target.value);
            }}
            id="standard-basic"
            label="Power"
            variant="standard"
          />
          <TextField
            value={weakness}
            onChange={(e) => {
              setWeakness(e.target.value);
            }}
            id="standard-basic"
            label="Weakness"
            variant="standard"
          />
          <TextField
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
            id="standard-basic"
            label="img"
            variant="standard"
          />
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="standard-basic"
            label="discription"
            variant="standard"
          />
          <Button
            onClick={() => {
              const newpoke = {
                name,
                power,
                weakness,
                img,
                description,
              };
              fetch(
                `https://61c412fdf1af4a0017d99285.mockapi.io/Pokemon/${datas.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify(newpoke),
                  headers: { "Content-Type": "application/json" },
                }
              )
                .then((data) => data.json())
                .then(() => history.push("/"));
            }}
            variant="contained"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}