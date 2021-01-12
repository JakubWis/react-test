import debounce from "debounce-promise";

export const checkProduct = debounce((pid, quantity) => {
  return fetch("/api/product/check", {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      pid,
      quantity,
    }),
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}, 500);
