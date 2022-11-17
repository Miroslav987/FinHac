import React, { createContext, useReducer } from "react";

export const chosenContext = createContext();

function getCountProductsChosen() {
  let chosen = JSON.parse(localStorage.getItem("chosen"));
  return chosen ? chosen.products.length : 0;
}

const INIT_STATE = {
  chosen: JSON.parse(localStorage.getItem("chosen")),
  chosenCount: getCountProductsChosen(),
};

function reducer(prevState, action) {
  switch (action.type) {
    case "GET_CHOSEN":
      return { ...prevState, chosen: action.payload };
    case "CHANGE_CHOSEN_COUNT":
      return { ...prevState, chosenCount: action.payload };
    default:
      return prevState;
  }
}

const ChosenContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function addProductToChosen(productObj) {
    let chosen = JSON.parse(localStorage.getItem("chosen"));
    if (chosen === null) {
      chosen = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: productObj,
      count: 1,
      subPrice: productObj.price,
    };

    // Хранение дубликатов
    let filterchosen = chosen.products.filter(elem => {
      return elem.item.id === productObj.id;
    });

    if (filterchosen.length > 0) {
      chosen.products = chosen.products.filter(elem => {
        return elem.item.id !== productObj.id;
      });
    } else {
      chosen.products.push(newProduct);
    }
    chosen.totalPrice = calcTotalPrice(chosen.products);
    localStorage.setItem("chosen", JSON.stringify(chosen));
    dispatch({
      type: "CHANGE_CHOSEN_COUNT",
      payload: chosen.products.length,
    });
  }

  function getChosen() {
    let chosen = JSON.parse(localStorage.getItem("chosen"));
    if (!chosen) {
      chosen = {
        products: [],
        totalPrice: 0,
      };
    }

    dispatch({
      type: "GET_CHOSEN",
      payload: chosen,
    });
  }

  function changeProductCount(id, count) {
    let chosen = JSON.parse(localStorage.getItem("chosen"));
    chosen.products = chosen.products.map(elem => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = count * elem.item.price;
      }
      return elem;
    });
    chosen.totalPrice = calcTotalPrice(chosen.products);
    localStorage.setItem("chosen", JSON.stringify(chosen));
    getChosen();
  }

  function calcTotalPrice(products) {
    let total = 0;
    products.map(item => {
      total += item.subPrice;
    });
    return total;
  }

  //   delete products in chosen

  function deleteChosenProduct(id) {
    let chosen = JSON.parse(localStorage.getItem("chosen"));
    chosen.products = chosen.products.filter(elem => {
      return elem.item.id !== id;
    });
    chosen.totalPrice = calcTotalPrice(chosen.products);
    dispatch({
      type: "CHANGE_CHOSEN_COUNT",
      payload: chosen.products.length,
    });
    localStorage.setItem("chosen", JSON.stringify(chosen));
    getChosen();
  }

  const cloud = {
    addProductToChosen,
    getChosen,
    changeProductCount,
    deleteChosenProduct,
    productsInChosen: state.chosen,
    chosenCount: state.chosenCount,
  };
  return (
    <chosenContext.Provider value={cloud}>{children}</chosenContext.Provider>
  );
};

export default ChosenContextProvider;
