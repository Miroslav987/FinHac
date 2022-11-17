import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { authContext } from "../../context/AuthContextProvider";
import { commentcontext } from "../../context/CommentContextProvider";
import { productContext } from "../../context/ProductContextProvider";

const Comment = () => {
  const { AddComment } = useContext(commentcontext);
  const { user } = React.useContext(authContext);
  const { productDetails } = useContext(productContext);

  const [comment, setComment] = useState("");
  let time = new Date();
  let hours = time.getHours();
  let minute = time.getMinutes();
  let Alltime = {
    hours,
    minute,
  };
  function handleAdd(e) {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Заполните все поля!");
      return;
    }

    let obj = {
      user: user.email,
      comment,
      card: productDetails.id,
      hour: Alltime.hours,
      minute: Alltime.minute,
    };
    AddComment(obj);
    setComment("");
  }
  return (
    <>
      <form
        style={{
          width: "35vw",
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
            label="Коментарий"
            variant="outlined"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Box>
        <Button
          sx={{
            background: "black",
          }}
          variant="contained"
          type="submit">
          Добавить
        </Button>
      </form>
    </>
  );
};

export default Comment;
