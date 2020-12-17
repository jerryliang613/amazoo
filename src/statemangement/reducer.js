import { getCurrentUser, getCartItems, getViewedItems } from './localstorage';


export const getInitialState = () => {
    const currentUser = getCurrentUser('user');
    const cart = getCartItems(currentUser);
    const viewed = getViewedItems(currentUser);
    // let cart = [], viewed = [];
    // if (items) {
    //     cart = items
    //         .map(e => ({ ...getItemById(e.id), quantity: e.quantity }))
    // }
    return ({ user: currentUser, cart, viewed });
}
export const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            const cart = !state.cart ? [] : [...state.cart];
            let index = cart.findIndex(e => e.id === action.item.id);
            if (index >= 0) cart[index].quantity += action.item.quantity;
            else {
                let newItem = { ...action.item };
                cart.push(newItem);
            }

            return (
                {
                    ...state,
                    cart
                }
            )

        case 'DELETE_ITEM':
            const filtered = state.cart ? state.cart.filter(e => e.id !== action.id) : null;
            return (
                {
                    ...state,
                    cart: filtered
                }
            )

        case 'LOG_OUT':
            return ({
                ...state,
                user: null,
                cart: null,
                viewed: null
            })

        case 'UPDATE_ITEM':
            const cart_update = state.cart ? [...state.cart] : [];
            let index_update = cart_update.findIndex(e => e.id === action.item.id);
            if (index_update >= 0) cart_update[index_update].quantity = action.item.quantity;
            else {
                let newItem_update = { ...action.item };
                cart_update.push(newItem_update);
            }
            return (
                {
                    ...state,
                    cart: cart_update
                }
            )
        case 'LOG_IN':
            return ({
                ...state,
                user: action.email,
            })
        case 'ADD_VIEWED_ITEMS':
            let viewed = state.viewed ? [...state.viewed] : [];
            if (!viewed) viewed.push({ ...action.item, time: Date.now() });
            const i = viewed.findIndex(e => e.id === action.item.id);
            if (i > -1) {
                viewed[i].time = Date.now();
            } else {

                let newViewed = { ...action.item, time: Date.now() };
                viewed.splice(0, 0, { ...newViewed });
            }
            viewed.sort((a, b) => b.time - a.time);
            return ({
                ...state,
                viewed: viewed
                    .slice(0, 4),
            })
        default:
            return state;

    }
}