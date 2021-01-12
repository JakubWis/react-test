import React, { memo } from "react";
import PropTypes from "prop-types";

const ItemQuantityDisplay = (props) => {
  const {
    currentQuantity,
    min,
    max,
    isBlocked,
    addOneProduct,
    removeOneProduct,
  } = props;

  const isMinusDisabeld = isBlocked || currentQuantity == min;
  const isPlusDisabled = isBlocked || currentQuantity == max;

  return (
    <div className="quantity-display">
      <span className="quantity-display__text">
        Obecnie masz <strong> {currentQuantity} </strong> sztuk produktu
      </span>
      <div className="quantity-display__buttons">
        <button
          className="quantity-display__buttons--minus"
          disabled={isMinusDisabeld}
          onClick={removeOneProduct}
        >
          -
        </button>
        <button
          className="quantity-display__buttons--plus"
          disabled={isPlusDisabled}
          onClick={addOneProduct}
        >
          +
        </button>
      </div>
    </div>
  );
};

ItemQuantityDisplay.propTypes = {
  currentQuantity: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  isBlocked: PropTypes.bool,
};

export default memo(ItemQuantityDisplay);
