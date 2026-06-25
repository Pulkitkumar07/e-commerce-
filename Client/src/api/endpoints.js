const endpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    profile: "/api/auth/profile",
  },
  admin: {
    products: {
      add: "/api/admin/products/add",
      get: "/api/admin/products/get",
      edit: (id) => `/api/admin/products/edit/${id}`,
      delete: (id) => `/api/admin/products/delete/${id}`,
    },
    orders: {
      all: "/api/admin/order/AllUserOrders",
      details: (id) => `/api/admin/order/OrderDetails/${id}`,
      updateStatus: (id) => `/api/admin/order/UpdateOrderStatus/${id}`,
    },
    feature: {
      add: "/api/admin/feature/add",
      get: "/api/admin/feature/get",
    },
  },
  shop: {
    products: {
      list: "/api/shop/products/get",
      details: (id) => `/api/shop/products/get/${id}`,
    },
    cart: {
      add: "/api/shop/cart/add",
      get: (userId) => `/api/shop/cart/get/${userId}`,
      update: (userId, productId) => `/api/shop/cart/update/${userId}/${productId}`,
      delete: (userId, productId) => `/api/shop/cart/delete/${userId}/${productId}`,
      clear: (userId) => `/api/shop/cart/clear/${userId}`,
    },
    address: {
      add: "/api/shop/address/add",
      all: (userId) => `/api/shop/address/all/${userId}`,
      edit: (userId, addressId) => `/api/shop/address/edit/${userId}/${addressId}`,
      delete: (userId, addressId) => `/api/shop/address/delete/${userId}/${addressId}`,
    },
    orders: {
      create: "/api/shop/order/create",
      capture: "/api/shop/order/capture",
      executePayment: "/api/shop/order/execute-payment",
      all: (userId) => `/api/shop/order/all/${userId}`,
      details: (orderId) => `/api/shop/order/details/${orderId}`,
    },
    review: {
      add: "/api/shop/review/add",
      get: (productId) => `/api/shop/review/get/${productId}`,
    },
    search: (keyword) => `/api/shop/search/${keyword}`,
  },
};

export default endpoints;
