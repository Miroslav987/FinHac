import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { productContext } from "../../../context/ProductContextProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./ProductDetails.css";
import StarIcon from "@mui/icons-material/Star";
import SwiperCore, { Thumbs } from "swiper";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { AddShoppingCart } from "@mui/icons-material";
import { basketContext } from "../../../context/BasketContextProvider";
import { chosenContext } from "../../../context/ChosenContextProvider";
import { authContext } from "../../../context/AuthContextProvider";

import { commentcontext } from "../../../context/CommentContextProvider";
import Comment from "../../Comments/Comment";

SwiperCore.use([Thumbs]);

const ProductDetails = () => {
  const { addProductToChosen } = useContext(chosenContext);
  const { AddComment, readComment, commentsArr, deleteComment } =
    useContext(commentcontext);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { readOneProduct, productDetails, deleteProduct } =
    useContext(productContext);
  const { addProductToBasket } = useContext(basketContext);
  const { user, handleLogout } = React.useContext(authContext);
  const { id } = useParams();

  useEffect(() => {
    readComment();
  }, []);

  useEffect(() => {
    readOneProduct(id);
  }, [id]);

  const navigate = useNavigate();
  return (
    <>
      {productDetails ? (
        <Container sx={{ marginTop: "40px" }}>
          <Grid id="prodCard" container spacing={2}>
            <Grid item xs={6}>
              <Swiper
                className="mySwiper2"
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}>
                <SwiperSlide>
                  <img src={productDetails.img1} alt={productDetails.title} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={productDetails.img2} alt={productDetails.title} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={productDetails.img3} alt={productDetails.title} />
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper">
                <SwiperSlide>
                  <Paper elevation={3}>
                    <img src={productDetails.img1} alt={productDetails.title} />
                  </Paper>
                </SwiperSlide>
                <SwiperSlide>
                  <Paper elevation={3}>
                    <img src={productDetails.img2} alt={productDetails.title} />
                  </Paper>
                </SwiperSlide>
                <SwiperSlide>
                  <Paper elevation={3}>
                    <img src={productDetails.img3} alt={productDetails.title} />
                  </Paper>
                </SwiperSlide>
              </Swiper>
              <Box>
                <Comment />
                {commentsArr
                  ? commentsArr.map(item => {
                      if (item.card == id) {
                        return (
                          <Card
                            className="Com"
                            sx={{
                              position: "relative",
                              background: "white",

                              marginBottom: "10px",
                            }}>
                            <br />
                            <Typography marginLeft={1}>
                              Добавлено в {item.hour}:{item.minute}
                            </Typography>
                            <Typography
                              marginLeft={1}
                              style={{ height: "auto" }}>
                              Имя: {item.user}
                            </Typography>
                            <Typography marginLeft={1}>
                              Коментарий: {item.comment}
                            </Typography>

                            <Button onClick={() => deleteComment(item.id)}>
                              Удалить
                            </Button>
                            <br />
                          </Card>
                        );
                      }
                    })
                  : null}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Paper
                className="DetInfo"
                elevation={3}
                sx={{
                  position: "relative",
                  color: "white",
                  background: "#414141a3",
                  borderRadius: 1,
                  boxShadow: "0px 0px 32px -10px #00ff0b",
                  padding: "10px",
                  marginTop: "40px",
                }}>
                <Typography variant="h4">{productDetails.title}</Typography>
                <Typography variant="h5">{productDetails.model}</Typography>

                <Typography multiline sx={{ marginTop: "30px" }}>
                  {productDetails.description}
                </Typography>
                <Alert
                  icon={<AttachMoneyIcon />}
                  variant="outlined"
                  severity="success"
                  sx={{
                    fontSize: "25px",
                    fontWeight: 700,
                    mt: "20px",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}>
                  Цена: {productDetails.price} сом
                  <Button variant="contained" sx={{ marginLeft: "20px" }}>
                    Купить
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: "20px" }}
                    onClick={() => addProductToBasket(productDetails)}>
                    <AddShoppingCart />
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    aria-label="add to favorites"
                    sx={{ marginLeft: "20px" }}
                    onClick={() => addProductToChosen(productDetails)}>
                    <StarIcon />
                  </Button>
                </Alert>
                {user.email === "mirsichkar@gmail.com" ? (
                  <Box
                    sx={{
                      mt: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        border: " 2px solid red",
                        background: "black",
                        color: "red",
                        width: "48%",
                      }}
                      onClick={() => deleteProduct(productDetails.id)}>
                      Delete
                    </Button>
                    ;
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{
                        border: " 2px solid orange",
                        background: "black",
                        color: "orange",
                        width: "48%",
                      }}
                      onClick={() => navigate(`/edit/${productDetails.id}`)}>
                      Edit
                    </Button>
                  </Box>
                ) : null}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </>
  );
};

export default ProductDetails;
