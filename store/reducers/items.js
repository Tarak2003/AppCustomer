/* import {
    SET_ITEMS
} from '../actions/items';

const initialState = {
    items: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            const addedProduct = action.product;
    }
    return state
} */

import {
    SET_ITEMS
} from '../actions/item';

const initialState = {
    availableProducts: [],
    userProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
    }
    return state
}