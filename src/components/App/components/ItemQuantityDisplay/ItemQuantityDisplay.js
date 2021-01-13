import React, { memo } from "react";
import "./ItemQuantityDisplay.css";
import PropTypes from "prop-types";
import { checkProduct } from "../../../../api/checkProduct";

const ItemQuantityDisplay = (props) => {
  const { pid, min, max, isBlocked, currentQuantity, updateQuantity } = props;

  const isMinusDisabeld = isBlocked || currentQuantity == min;
  const isPlusDisabled = isBlocked || currentQuantity == max;

  const addNumberToQuantity = (number) => {
    const newQuantity = currentQuantity + number;
    updateQuantity(pid, newQuantity);

    checkProduct(pid, newQuantity).then((res) => {
      if (res.isError) {
        updateQuantity(pid, min);
      }
    });
  };

  return (
    <div className="quantity-display">
      <span className="text">
        Obecnie masz <strong> {currentQuantity} </strong> sztuk produktu
      </span>
      <div className="buttons-block">
        <button
          className="button-minus"
          disabled={isMinusDisabeld}
          onClick={() => addNumberToQuantity(-1)}
        >
          -
        </button>
        <button
          className="button-plus"
          disabled={isPlusDisabled}
          onClick={() => addNumberToQuantity(1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

ItemQuantityDisplay.propTypes = {
  pid: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  isBlocked: PropTypes.bool,
  currentQuantity: PropTypes.number.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default memo(ItemQuantityDisplay);
