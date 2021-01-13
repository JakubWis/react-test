import React, { useEffect, useState } from "react";
import "./App.css";
import { getProducts } from "../../api/getProducts";
import { showStringPrice } from "../../common/functions/showStringPrice";
import ItemDisplay from "./components/ItemDisplay/ItemDisplay";
import ItemQuantityDisplay from "./components/ItemQuantityDisplay/ItemQuantityDisplay";

const App = () => {
  const [cartItems, setCartItems] = useState();
  const [sumPriceDisplay, setSumPriceDisplay] = useState();

  useEffect(() => {
    getProducts().then((res) => {
      setCartItems(res.map((item) => ({ ...item, quantity: item.min })));
    });
  }, []);

  useEffect(() => {
    if (cartItems) {
      let newSumPrice = 0;
      cartItems.forEach((item) => {
        newSumPrice += item.quantity * item.price;
      });
      setSumPriceDisplay(showStringPrice(newSumPrice.toFixed(2)));
    }
  }, [cartItems]);

  const updateQuantity = (pid, newQuantity) => {
    const indexOfUpdatedItem = cartItems.findIndex((item) => item.pid == pid);
    const newArray = [...cartItems];

    newArray[indexOfUpdatedItem] = {
      ...newArray[indexOfUpdatedItem],
      quantity: newQuantity,
    };
    setCartItems(newArray);
  };

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <li className="row" key={item.pid}>
              <ItemDisplay
                name={item.name}
                price={showStringPrice(item.price)}
              />
              <ItemQuantityDisplay
                pid={item.pid}
                min={item.min}
                max={item.max}
                currentQuantity={item.quantity}
                updateQuantity={updateQuantity}
              />
            </li>
          ))}
      </ul>
      {sumPriceDisplay && <h2 className="sum">Suma: {sumPriceDisplay}</h2>}
    </div>
  );
};

export { App };
