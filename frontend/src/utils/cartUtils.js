export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => (
    acc + item.price * item.qty
  ), 0))

  // calculate shipping price
  if (state.itemsPrice > 100) {
    state.shippingPrice = 10 // shippingPrice = 10
  } else {
    state.shippingPrice = 10 // shippingPrice = 0
  }

  // calculate tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2))) // taxPrice = 15% of itemsPrice

  // calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2) // totalPrice = itemsPrice + shippingPrice + taxPrice

  localStorage.setItem('cart', JSON.stringify(state))

  return state
}
