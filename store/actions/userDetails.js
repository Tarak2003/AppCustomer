import User from "../../models/user";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(
                'https://zjkdbfkugwe-default-rtdb.firebaseio.com/user.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new User(
                        key,
                        resData[key].ownerId,
                        resData[key].name,
                        resData[key].location
                    )
                );
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.ownerId === userId) });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteProduct = productId => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        await fetch(
            `https://zjkdbfkugwe-default-rtdb.firebaseio.com/user/${productId}.json?auth=${token}`, {
                method: 'DELETE'
            }
        );
        dispatch({ type: DELETE_PRODUCT, pid: productId });
    };
};

/*
export const createProduct = (name, location) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://zing-be596-default-rtdb.firebaseio.com/user.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          location,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        name,
        location,
        ownerId: userId
      }
    });
  };
};
*/

export const createProduct = (name, location) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://zjkdbfkugwe-default-rtdb.firebaseio.com/user.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    location,
                    ownerId: userId
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                name,
                location,
                ownerId: userId
            }
        });
    };
};

export const updateProduct = (id, name, location) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token
        await fetch(
            `https://zjkdbfkugwe-default-rtdb.firebaseio.com/user/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    location,

                })
            }
        );

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                name,
                location,
            }
        });
    };
};