import Restaurant from "../../models/restaurant";

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        //const userId = getState().auth.userId
        try {
            const response = await fetch(
                'https://zing-be596-default-rtdb.firebaseio.com/restaurant.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Restaurant(
                        key,
                        resData[key].ownerId,
                        resData[key].restaurantName,
                        resData[key].imageUrl,
                        resData[key].location,
                        resData[key].description
                    )
                );
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts });
        } catch (err) {
            throw err;
        }
    };
};