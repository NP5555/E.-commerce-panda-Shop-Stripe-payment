import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const {productId, quantity, name} = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(indexProductId >= 0){
                state.items[indexProductId].quantity += quantity;
            }else{
                // Ensure name is included when adding new item
                state.items.push({
                    productId,
                    quantity,
                    name: name || 'Unknown Product' // Fallback name if undefined
                });
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        
        changeQuantity(state, action){
            const {productId, quantity, name} = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if(indexProductId >= 0){
                state.items[indexProductId] = {
                    ...state.items[indexProductId],
                    quantity,
                    name    // Make sure to update the name
                };
                localStorage.setItem("carts", JSON.stringify(state.items));
            }
        },
        toggleStatusTab(state){
            if(state.statusTab === false){
                state.statusTab = true;
            }else{
                state.statusTab = false;
            }
        }
    }
})
export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;