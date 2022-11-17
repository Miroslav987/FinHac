import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { productContext } from "../../../context/ProductContextProvider";
import "./AddProduct.css";

const AddProduct = () => {
  const { addProduct } = useContext(productContext);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  function handleAdd(e) {
    e.preventDefault(); // останавливает автообновление бразуреа при отправке данных через form
    if (
      !category.trim() ||
      !title.trim() ||
      !model.trim() ||
      !description.trim() ||
      !color.trim() ||
      !price.trim() ||
      !img1.trim() ||
      !img2.trim() ||
      !img3.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }

    let obj = {
      category,
      title,
      model,
      description,
      color,
      price: +price,
      img1,
      img2,
      img3,
    };
    addProduct(obj);
    setCategory("");
    setTitle("");
    setModel("");
    setDescription("");
    setColor("");
    setPrice(0);
    setImg1("");
    setImg2("");
    setImg3("");
  }

  return (
    <>
      <h2
        style={{
          position: "relative",
          color: "white",
          fontFamily: "sans-serif",
        }}
        id="add-title">
        Добавление товара
      </h2>
      <form
        style={{
          position: "relative",
          borderRadius: "5px",
          background: " rgb(242 242 242 / 85%)",
          border: " 10px solid rgb(218 218 218 / 69%)",
        }}
        id="form-add"
        onSubmit={e => handleAdd(e)}>
        <Box sx={{ display: "flex" }}>
          <TextField
            className="outlined-basic"
            label="Категория"
            variant="outlined"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <TextField
            className="outlined-basic"
            label="Название"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            className="outlined-basic"
            label="Модель"
            variant="outlined"
            value={model}
            onChange={e => setModel(e.target.value)}
          />
          <TextField
            className="outlined-basic"
            label="Цвет"
            variant="outlined"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </Box>
        <TextField
          className="outlined-basic"
          label="Описание"
          variant="outlined"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Box sx={{ display: "flex" }}>
          <TextField
            type="number"
            className="outlined-basic"
            label="Цена"
            variant="outlined"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <TextField
            className="outlined-basic"
            label="Фото 1"
            variant="outlined"
            value={img1}
            onChange={e => setImg1(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            className="outlined-basic"
            label="Фото 2"
            variant="outlined"
            value={img2}
            onChange={e => setImg2(e.target.value)}
          />

          <TextField
            className="outlined-basic"
            label="Фото 3"
            variant="outlined"
            value={img3}
            onChange={e => setImg3(e.target.value)}
          />
        </Box>
        {/* </Box> */}
        <Button
          sx={{
            background: "black",
            // borderBottom: "1px solid white",
            // borderLeft: "1px solid white",
            // borderRight: "1px solid white",
          }}
          variant="contained"
          type="submit">
          Добавить
        </Button>
      </form>
    </>
  );
};

export default AddProduct;
