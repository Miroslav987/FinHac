import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import React from "react";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import PowerIcon from "@mui/icons-material/Power";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import LiveSearch from "../LiveSearch/LiveSearch";

const Filter = ({ category, setCategory, price, setPrice }) => {
  return (
    <FormControl
      sx={{
        backgroundColor: "#4848486b",
        borderRadius: "10px",
        width: "50vw",
        height: "100%",
      }}>
      <FormLabel
        sx={{
          margin: "auto",
          color: "white",
          fontSize: "20px",
          marginTop: "10px",
        }}
        id="demo-radio-buttons-group-label">
        По Категориям
      </FormLabel>
      <RadioGroup
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="all"
        name="radio-buttons-group"
        value={category}
        onChange={e => setCategory(e.target.value)}>
        <FormControlLabel
          value="all"
          label={<DensitySmallIcon />}
          control={<Radio />}
        />
        <FormControlLabel
          value="car"
          label={<DirectionsCarIcon />}
          control={<Radio />}
        />
        <FormControlLabel
          value="home"
          control={<Radio />}
          label={<HomeIcon />}
        />
        <FormControlLabel
          value="electro"
          control={<Radio />}
          label={<PowerIcon />}
        />
      </RadioGroup>
      <LiveSearch />
      <FormLabel
        sx={{ margin: "auto", color: "white", fontSize: "18px" }}
        id="demo-radio-buttons-group-label">
        По ценам
      </FormLabel>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={price}
        onChange={e => setPrice(e.target.value)}
        valueLabelDisplay="auto"
        style={{
          width: "90%",
          margin: "auto ",
          color: "white",
          marginBottom: "10px",
        }}
        min={0}
        max={200000}
      />
    </FormControl>
  );
};

export default Filter;
