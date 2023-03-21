import Product from '../../models/product';

export const SET_ITEMS = 'SET_ITEMS';

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        //const ownerId = getState().item.ownerId
        try {
            const response = await fetch(
                'https://zing-be596-default-rtdb.firebaseio.com/products.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].price,
                        resData[key].description
                    )
                );
            }

            dispatch({ type: SET_ITEMS, products: loadedProducts, userProducts: loadedProducts });
        } catch (err) {
            throw err;
        }
    };
};