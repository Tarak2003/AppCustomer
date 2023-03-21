import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDERS';

export const fetchOrders = () => {
    return async(dispatch, getState) => {
        const user = getState().auth.userId;
        try {
            const response = await fetch(
                'https://zjkdbfkugwe-default-rtdb.firebaseio.com/orders.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date),
                        resData[key].userId,
                        resData[key].restaurantName,
                        resData[key].user
                    )
                );
            }
            dispatch({ type: SET_ORDER, order: loadedOrders.filter(prod => prod.user === user) });
        } catch (err) {
            throw err;
        }
    };
};

export const addOrder = (cartItems, totalAmount, userId, restaurantName, user) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const date = new Date();
        const response = await fetch(
            `https://zjkdbfkugwe-default-rtdb.firebaseio.com/orders.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                    userId,
                    restaurantName,
                    user
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date,
                userId: userId,
                restaurantName: restaurantName,
                user: user
            }
        });
    };
};

/*
export const fetchOrders = () => {
    return async(dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://zjkdbfkugwe-default-rtdb.firebaseio.com/orders/${userId}.json`
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }
            dispatch({ type: SET_ORDER, order: loadedOrders });
        } catch (err) {
            throw err;
        }
    };
};

export const addOrder = (cartItems, totalAmount) => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(
            `https://zjkdbfkugwe-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    };
};
*/