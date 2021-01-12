import React, { memo, useState } from "react";
import "./ItemQuantityDisplay.css";
import PropTypes from "prop-types";
import { checkProduct } from "../../../../api/checkProduct";

const ItemQuantityDisplay = (props) => {
  const { pid, min, max, isBlocked, updateQuantity } = props;

  const [quantity, setQuantity] = useState(min);

  const isMinusDisabeld = isBlocked || quantity == min;
  const isPlusDisabled = isBlocked || quantity == max;

  const addNumber = (number) => {
    const newQuantity = quantity + number;
    setQuantity(newQuantity);

    checkProduct(pid, newQuantity).then((res) => {
      if (res.isError) {
        setQuantity(min);
      } else {
        updateQuantity(pid, newQuantity);
      }
    });
  };

  return (
    <div className="quantity-display">
      <span className="text">
        Obecnie masz <strong> {quantity} </strong> sztuk produktu
      </span>
      <div className="buttons-block">
        <button
          className="button-minus"
          disabled={isMinusDisabeld}
          onClick={() => addNumber(-1)}
        >
          -
        </button>
        <button
          className="button-plus"
          disabled={isPlusDisabled}
          onClick={() => addNumber(1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

ItemQuantityDisplay.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  isBlocked: PropTypes.bool,
};

export default memo(ItemQuantityDisplay);
