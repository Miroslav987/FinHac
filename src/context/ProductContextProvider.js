import axios from "axios";
import React, { createContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import fire from "../fire";
// import fire from "../fire";
export const productContext = createContext(); // облако

const API = "http://localhost:8000/products";

const INIT_STATE = {
  products: null,
  productDetails: null,
  pageTotalCount: 1,
};

function reducer(prevState, action) {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...prevState,
        product: action.payload,
        // pageTotalCount: Math.ceil(action.payload.headers["x-total-count"] / 3),
      };
    case "GET_ONE_PRODUCT":
      return { ...prevState, productDetails: action.payload };
    default:
      return prevState;
  }
}
const ProductContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const location = useLocation();

  const navigate = useNavigate();

  const db = getFirestore(fire); // это API firebase

  async function addProduct(newProduct) {
    try {
      await addDoc(collection(db, "products"), newProduct);
    } catch (e) {
      console.error(e);
    }
  }
  // create;

  // async function addProduct(newProduct) {
  //   try {
  //     await axios.post(API, newProduct);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  //   read

  // async function readProduct() {
  //   const res = await axios(`${API}${location.search}`);
  //   dispatch({
  //     type: "GET_PRODUCT",
  //     payload: res,
  //   });
  // }

  // async function readOneProduct(id) {
  //   const { data } = await axios(`${API}/${id}`);
  //   dispatch({
  //     type: "GET_ONE_PRODUCT",
  //     payload: data,
  //   });
  // }

  async function readProduct() {
    try {
      const { docs } = await getDocs(collection(db, "products"));

      const data = docs.map(item => {
        return { ...item.data(), id: item.id };
      });
      dispatch({
        type: "GET_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.error();
    }
  }

  async function readOneProduct(id) {
    try {
      const oneDoc = doc(db, "products", id);
      const data = await getDoc(oneDoc);
      let obj = { ...data.data(), id: data.id };
      dispatch({ type: "GET_ONE_PRODUCT", payload: obj });
    } catch (e) {
      console.error(e);
    }
  }

  // async function deleteProduct(id) {
  //   try {
  //     await axios.delete(`${API}/${id}`);
  //     readProduct();
  //     navigate("/list");
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // delete
  async function deleteProduct(id) {
    try {
      let oneDoc = doc(db, "products", id);
      await deleteDoc(oneDoc);
      readProduct();
      navigate("/list");
    } catch (e) {
      console.error(e);
    }
  }

  // async function editProduct(id, editedObj) {
  //   await axios.patch(`${API}/${id}`, editedObj);
  //   readProduct();
  // }

  // update
  async function editProduct(id, editedObj) {
    try {
      let oneDoc = doc(db, "products", id);
      await updateDoc(oneDoc, editedObj);
      readProduct();
      navigate(`/details/${id}`);
    } catch (e) {
      console.error(e);
    }
  }

  let cloud = {
    addProduct,
    readProduct,
    readOneProduct,
    deleteProduct,
    editProduct,
    productsArr: state.product,
    productDetails: state.productDetails,
    pageTotalCount: state.pageTotalCount,
  };

  return (
    <productContext.Provider value={cloud}>
      {props.children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
