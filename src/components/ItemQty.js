import { useState, useEffect } from "react";
import './css/itemqty.css';


const ItemQty = ({ item, onClick }) => {
    const { quantity } = item;
    const [count, setCount] = useState(quantity);
    const [showUpdate, setShowUpdate] = useState(parseInt(count) > 9 ? true : false);
    const [more, setMore] = useState(parseInt(quantity) > 9 ? true : false);
    useEffect(() => {
        setMore(parseInt(quantity) > 9 ? true : false);
    }, [quantity])

    const handleUpdate = ({ target }) => {

        if (Number(target.value)) {
            setCount(target.value);
        }

    }
    const handleChange = ({ target }) => {

        if (parseInt(target.value) === 10 && !more) {
            setMore(true);
            setShowUpdate(true);
            return;
        }
        setCount(target.value);
        onClick(target.value);

    }

    const handleBtnUpdate = () => {
        setShowUpdate(false);
        if (count < 10 && more) setMore(false);
        onClick(count);
    }
    return (
        <div className='itemqty'>
            <span>Qty: </span>
            {!more ? <select name="item_qty" id="item_qty" value={quantity} onChange={e => handleChange(e)}>
                {
                    Array(9)
                        .fill()
                        .map((e, index) => <option key={index} value={index + 1}>{index + 1}</option>)
                }
                <option value={10}>10+</option>
            </select>
                : <>
                    <input type="text" value={count} onChange={handleUpdate} onFocus={() => setShowUpdate(true)} />
                    {showUpdate && <button onClick={handleBtnUpdate}>update</button>}
                </>
            }
        </div>
    );
}

export default ItemQty;