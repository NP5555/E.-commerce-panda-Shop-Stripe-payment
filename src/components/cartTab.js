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

    const makepayment = async () => {
        const stripe = await loadStripe('pk_test_51QFzY7RsAkBPZnqDlmWkC5bOTEJPBscoRg1Hqc5XJGMMddkxGiP69zjn1aryKjkXxU1Vtaa7ScCzuely4VlL6JN5004jWgolbg');

        const body = { products: carts };
        const headers = { 'Content-Type': "application/json" };

        try {
            const response = await fetch("http://localhost:3000/api/create-checkout-session", {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error("Stripe Checkout Error:", result.error.message);
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };


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