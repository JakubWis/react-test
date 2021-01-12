export const getProducts = () => {
  return fetch("/api/cart")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
