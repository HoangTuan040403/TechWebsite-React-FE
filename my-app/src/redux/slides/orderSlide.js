import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [

    ],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            console.log('orderItem', orderItem)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder.amount--
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload  // Chỉ nhận payload trực tiếp là idProduct
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
            state.orderItems = itemOrder
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
            state.orderItems = itemOrders
        },




    },
})

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllOrderProduct } = orderSlide.actions
export default orderSlide.reducer
