export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
  const calculateItemsPrice = () => {
    return addDecimals(state.cartItems.reduce((acc, item) => (
      acc + item.price * item.qty
    ), 0))
  }

  const calculateShippingPrice = () => {
    return state.itemsPrice > 100 ? 10 : 0
  }

  const calculateTaxPrice = () => {
    return addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
  }

  const calculateTotalPrice = () => {
    return (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  }

  state.itemsPrice = calculateItemsPrice()
  state.shippingPrice = calculateShippingPrice()
  state.taxPrice = calculateTaxPrice()
  state.totalPrice = calculateTotalPrice()

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
