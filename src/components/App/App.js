import React, { useEffect, useState } from "react";
import "./App.css";
import { getProducts } from "../../api/getProducts";
import ItemDisplay from "./components/ItemDisplay/ItemDisplay";

const App = () => {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    getProducts().then((res) => {
      setCartItems(res);
    });
  }, []);

  return (
    <div className="container">
      <h3>Lista produktów</h3>

      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <li className="row">
              <ItemDisplay name={item.name} price={item.price} />
            </li>
          ))}

        {/* <li className="row">Patelnia, cena: 89,99zł</li> */}
      </ul>
    </div>
  );
};

export { App };
