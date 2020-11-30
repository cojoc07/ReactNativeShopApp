import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  //actiunea returneaza o functie async
  //functia async primeste ca parametru -> functia dispatch
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
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
            resData[key].ownerId,
            resData[key].soldBy,
            resData[key].createDate,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      loadedProducts.sort((a, b) => a.createDate < b.createDate);
      //functia dispatch oferita de redux thunk
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    //avem acces la state-ul curent folosind getState din redux thunk
    const token = getState().auth.token;
    const response = await fetch(
      `***REMOVED***/products/${productId}.json?auth=${token}`,
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
  return async (dispatch, getState) => {
    //avem acces la state-ul curent folosind getState din redux thunk
    const userId = getState().auth.userId;
    const userEmail = getState().auth.userEmail;
    const token = getState().auth.token;
    const createDate = new Date();

    const response = await fetch(
      `***REMOVED***/products.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          imageUrl: imageUrl,
          price: price,
          ownerId: userId,
          createDate: createDate,
          soldBy: userEmail,
        }),
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
        ownerId: userId,
        soldBy: userEmail,
        createDate: createDate,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    //avem acces la state-ul curent folosind getState din redux thunk
    const token = getState().auth.token;
    try {
      await fetch(
        `***REMOVED***/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
          }),
        }
      );
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
