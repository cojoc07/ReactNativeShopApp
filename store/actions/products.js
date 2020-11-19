import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  //actiunea returneaza o functie async
  //functia async primeste ca parametru -> functia dispatch
  return async (dispatch) => {
    try {
      const response = await fetch(
        "***REMOVED***/products.json"
      );

      if (!response.ok) {
        throw new Error("Error while fetching.");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      //functia dispatch oferita de redux thunk
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `***REMOVED***/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "***REMOVED***/products.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );
    const resData = await response.json();

    //functia dispatch oferita de redux thunk
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch) => {
    try {
      await fetch(`***REMOVED***/products/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl, price }),
      });
      //functia dispatch oferita de redux thunk
      //
      //functia este invelita automat in THEN deoarece fetch are AWAIT
      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          price: price,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
