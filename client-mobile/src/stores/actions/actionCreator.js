import { BASEURL, FETCH_PRODUCTS_SUCCESS } from "./actionType";

const fetchProductPayload = (payload) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload,
  };
};

export function fetchProduct() {
  return async (dispatch) => {
    try {
      let response = await fetch(BASEURL + "/c/products", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
      dispatch(fetchProductPayload(result));
    } catch (error) {
      console.log(error);
    }
  };
}
