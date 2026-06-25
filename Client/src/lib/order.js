export const getCartItemsFromState = (cartState) => {
  return cartState?.cartItems || cartState?.items || cartState?.cart || [];
};

export const getCartItemPrice = (item) => {
  return Number(item.salePrice > 0 ? item.salePrice : item.price);
};

export const getCartSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + getCartItemPrice(item) * Number(item.quantity);
  }, 0);
};

export const buildOrderPayload = ({ userId, cartItems, address, totalAmount }) => {
  return {
    userId,
    cartItems: cartItems.map((item) => ({
      productId: item?.productId,
      title: item?.title,
      price: getCartItemPrice(item),
      quantity: Number(item.quantity),
    })),
    addressInfo: {
      addressId: address?._id,
      address: address?.address,
      city: address?.city,
      pincode: address?.pincode,
      phone: address?.phone,
      notes: address?.notes,
    },
    totalAmount,
    orderStatus: "Pending",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    orderDate: new Date(),
    orderUpdate: new Date(),
    paymentId: "",
    payerId: "",
  };
};
