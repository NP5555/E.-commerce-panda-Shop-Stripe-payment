import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';
import { toggleStatusTab } from '../stores/cart';
import { loadStripe } from '@stripe/stripe-js';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }

    // payment integration
    const makepayment = async () => {
        const stripe = await loadStripe('pk_test_51QFzY7RsAkBPZnqDlmWkC5bOTEJPBscoRg1Hqc5XJGMMddkxGiP69zjn1aryKjkXxU1Vtaa7ScCzuely4VlL6JN5004jWgolbg');

        const body = {
            products: carts
        }
        console.log(carts)
        const headers = {
            'Content-Type': "application/json"
        }

        const responce = await fetch("", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await responce.json();
        const result = stripe.redirectToCheckout({
            session: session.id
        })

    }


    return (
        <div className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}
    `}>
            <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
            <div className='p-5'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item} />
                )}
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white' onClick={handleCloseTabCart}>CLOSE</button>
                <button className='bg-amber-600 text-white' onClick={makepayment} >CHECKOUT</button>
            </div>
        </div>
    )
}

export default CartTab