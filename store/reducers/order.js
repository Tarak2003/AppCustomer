import { ADD_ORDER, SET_ORDER } from '../actions/order';
import Order from '../../models/order';

const initialState = {
    order: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                order: action.order
            };
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date,
                action.orderData.userId,
                action.orderData.restaurantName,
                action.orderData.user
            );
            return {
                ...state,
                orders: state.order.concat(newOrder)
            };
    }

    return state;
};

/*
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                order: action.order
            };
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );
            return {
                ...state,
                orders: state.order.concat(newOrder)
            };
    }

    return state;
};
*/