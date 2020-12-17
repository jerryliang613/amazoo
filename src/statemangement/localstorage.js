import { getItemById } from "../services/products";

export const saveToLocal = (key, obj) => {
    try {

        let items = JSON.parse(localStorage.getItem(key));
        if (!items) localStorage.setItem(key, JSON.stringify([obj]));
        else {
            const item = items.find(e => e.id === obj.id);
            if (item) items = items.map(e => {
                if (e.id === obj.id) return ({ id: e.id, quantity: e.quantity + obj.quantity })
                else return e;
            })
            else items.push(obj);
            localStorage.setItem(key, JSON.stringify(items));
        }
    } catch {

    }

}

export const saveItemsToLocal = (key, items) => {
    try {

        localStorage.setItem(key, JSON.stringify(items));
    } catch {

    }

}


export const updateToLocal = (key, obj) => {
    try {
        let items = JSON.parse(localStorage.getItem(key));
        if (!items) {
            localStorage.setItem(key, JSON.stringify([obj]));
            return;
        }
        const item = items.find(e => e.id === obj.id);
        if (item) items = items.map(e => {
            if (e.id === obj.id) return ({ id: e.id, quantity: obj.quantity })
            else return e;
        })
        else items.push(obj);
        localStorage.setItem(key, JSON.stringify(items));
    } catch
    {

    }
}

export const getLocalItems = (key) => {
    try {

        return JSON.parse(localStorage.getItem(key));
    } catch { }
}
export const getCartItems = (key) => {
    try {

        const { cart } = JSON.parse(localStorage.getItem(key));
        return cart ? cart.map(e => {
            const item = getItemById(e.id);
            const { price, title, image, rating } = item;
            return ({
                id: e.id,
                price,
                title,
                rating,
                image,
                quantity: e.quantity
            })

        })
            : null;
    } catch { }
}
export const getViewedItems = (key) => {
    try {

        const { viewed } = JSON.parse(localStorage.getItem(key));
        return viewed ? viewed.map(e => {
            const item = getItemById(e.id);
            const { price, title, image, rating } = item;
            return ({
                id: e.id,
                price,
                title,
                rating,
                image,
            })

        })
            : null;
    } catch { }
}


export const deleteLocalItem = (key, id) => {
    try {

        let items = JSON.parse(localStorage.getItem(key));
        items = items.filter(e => e.id !== id);
        localStorage.setItem(key, JSON.stringify(items));
    } catch {

    }

}

export const saveViewedToLocal = (key, obj) => {
    try {

        let items = JSON.parse(localStorage.getItem(key));
        if (!items) localStorage.setItem(key, JSON.stringify([obj]));
        else {
            const item = items.find(e => e.id === obj.id);
            if (item) items = items.map(e => {
                if (e.id === obj.id) return ({ id: e.id, date: obj.date })
                else return e;
            })
            else items.push(obj);
            localStorage.setItem(key, JSON.stringify(items));
        }
    } catch {

    }
}

export const getCurrentUser = () => {
    const result = JSON.parse(localStorage.getItem('user'));
    return result ? result : null;
}

export const saveLoginUser = user => {
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (ex) {
    }
}
export const logout = () => {
    try {
        localStorage.removeItem('user');
    } catch { }
}