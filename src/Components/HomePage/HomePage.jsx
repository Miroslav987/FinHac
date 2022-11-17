import { CardMedia, Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./HomePage.css";
const HomePage = () => {
  return (
    <>
      <div className="textBG">
        <Typography
          className="tr"
          style={{ marginTop: "50px", fontSize: "50px", position: "relative" }}>
          Welcome OnlineShop
        </Typography>
      </div>
    </>
  );
};

export default HomePage;
