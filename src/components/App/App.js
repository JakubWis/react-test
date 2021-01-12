import React, { useEffect, useState } from "react";
import "./App.css";
import { getProducts } from "../../api/getProducts";
import { showStringPrice } from "../../common/functions";
import ItemDisplay from "./components/ItemDisplay/ItemDisplay";
import ItemQuantityDisplay from "./components/ItemQuantityDisplay/ItemQuantityDisplay";

const App = () => {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    getProducts().then((res) => {
      setCartItems(res.map((item) => ({ ...item, quantity: item.min })));
    });
  }, []);

  const addOneProduct = (pid) => {
    const indexOfUpdatedItem = cartItems.findIndex((item) => item.pid == pid);
    const newArray = [...cartItems];

    newArray[indexOfUpdatedItem] = {
      ...newArray[indexOfUpdatedItem],
      quantity: newArray[indexOfUpdatedItem].quantity + 1,
    };

    setCartItems(newArray);
  };

  const removeOneProduct = (pid) => {
    const indexOfUpdatedItem = cartItems.findIndex((item) => item.pid == pid);
    const newArray = [...cartItems];

    newArray[indexOfUpdatedItem] = {
      ...newArray[indexOfUpdatedItem],
      quantity: newArray[indexOfUpdatedItem].quantity - 1,
    };

    setCartItems(newArray);
  };

  return (
    <div className="container">
      <h3>Lista produktów</h3>

      <button onClick={() => console.log(cartItems)}>asda</button>

      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <li className="row" key={item.pid}>
              <ItemDisplay
                name={item.name}
                price={showStringPrice(item.price)}
              />
              <ItemQuantityDisplay
                currentQuantity={item.quantity}
                min={item.min}
                max={item.max}
                addOneProduct={() => addOneProduct(item.pid)}
                removeOneProduct={() => removeOneProduct(item.pid)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export { App };
