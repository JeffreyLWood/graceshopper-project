import React, { useSelector } from 'react';
import reducer from '../store/index'

const DUMMY_DATA = [
    {
        id: 1,
        type: 'Guitar',
        brand: 'Gibson',
        model: 'Les Paul',
        quantity: 3,
        //Price in cents
        price: 10000,
        imageUrl:
            'https://images.reverb.com/image/upload/s--eL1LjCeA--/f_auto,t_large/v1635547543/umviwjty2t3fbe68fi6a.jpg',
        description: 'A Gibson Les Paul',
    },
    {
        id: 1,
        type: 'Piano',
        brand: 'Donner',
        model: 'DDP-100',
        quantity: 1,
        //Price in cents
        price: 62599,
        imageUrl: 'https://m.media-amazon.com/images/I/618Bsj-lf4L._AC_SL1500_.jpg',
        description: 'A Donner DDP-100',
    },
];

const Cart = () => {

    //const cart = useSelctor(state => state.cart)
    const mappedCart = DUMMY_DATA.map(item => {
        let currentPrice = (item.price * item.quantity / 100).toFixed(2)
        return (
            <div key={item.id} >
                <img src={item.imageUrl} />
                <h3>{`Type: ${item.type}`}</h3>
                <h3>{`Item: ${item.brand} ${item.model}`}</h3>
                <p>Price: <b>${currentPrice} {`(${item.quantity}x)`}</b></p>
            </div>
        )
    })
    let totalPrice = DUMMY_DATA.reduce((accumultator, item) => {
        return accumultator + (item.price * item.quantity / 100)
    }, 0)

    return (
        <div>
            <h1>Cart Page</h1>
            {mappedCart}
            <h3>Total: $<b>{totalPrice.toFixed(2)}</b></h3>
        </div>
    )
}
export default Cart;