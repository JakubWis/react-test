import React, { memo } from "react";
import PropTypes from "prop-types";

const ItemDisplay = (props) => {
  const { name, price } = props;
  return <div>{`${name}, cena: ${price}`}</div>;
};

ItemDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default memo(ItemDisplay);
