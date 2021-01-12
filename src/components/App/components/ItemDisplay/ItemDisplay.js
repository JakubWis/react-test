import React, { memo } from "react";

const ItemDisplay = (props) => {
  const { name, price } = props;
  return <div>{`${name}, cena: ${price}`}</div>;
};

export default memo(ItemDisplay);
