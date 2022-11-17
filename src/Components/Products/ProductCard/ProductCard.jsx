import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import "./ProductCard.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

// import { chosenContext } from "../../../context/ChosenContextProvider";
import { productContext } from "../../../context/ProductContextProvider";
import { useState } from "react";
import { chosenContext } from "../../../context/ChosenContextProvider";

const ProductCard = ({ obj }) => {
  const { addProductToChosen } = useContext(chosenContext);
  const { productDetails } = useContext(productContext);

  const navigate = useNavigate();
  let background = obj.color;
  let style = {
    background,
  };
  // console.log(obj.comment);
  // function Like() {
  //   style = {
  //     color: "red",
  //   };
  //   setSt(style);
  // }
  // const [st, setSt] = useState();
  return (
    <div className="block">
      {/* <Link to={`/details/${obj.id}`}> */}

      <Card
        className="card"
        sx={{
          position: "relative",
          zIndex: 0,
          background: "#414141a3",
          borderRadius: 5,
          boxShadow: "0px 0px 32px -10px #00ff0b",
        }}>
        <Link to={`/details/${obj.id}`}>
          <CardHeader className="stcolor" title={obj.category.toUpperCase()} />

          <CardMedia
            className="cardImg"
            component="img"
            image={obj.img1}
            alt={obj.title}
          />

          <CardContent>
            <Typography
              className="stcolor"
              variant="h5"
              style={{ marginBottom: 10 }}>
              {obj.title} {obj.model}
            </Typography>
            <div
              style={{
                marginBottom: 10,
                height: 20,
                display: "flex",
                alignItems: "center",
              }}>
              <h2 className="stcolor">color:</h2>
              <div className="block1" style={style}></div>
            </div>
            <Typography variant="h5" className="cardText">
              {obj.price} сом
            </Typography>
            {/* <IconButton
              aria-label="add to favorites"
              sx={{ marginLeft: "20px" }}
              onClick={() => addProductToChosen(productDetails)}>
              <StarIcon />
            </IconButton> */}
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default ProductCard;
