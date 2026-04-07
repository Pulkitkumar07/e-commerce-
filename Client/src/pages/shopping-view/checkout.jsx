import Address from '@/components/shopping-view/address'
import img from '../../assets/account.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createOrder, capturePayment } from '@/store/actions/orderAction.jsx'

const ShoppingCheckout = () => {

  const dispatch = useDispatch()

  const cartState = useSelector((state) => state.cartProduct)
  const user = useSelector((state) => state.user?.user)
  const address = useSelector((state) => state.addressList.selectedAddress)

  const cartItems =
    cartState?.cartItems ||
    cartState?.items ||
    cartState?.cart ||
    []

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const delivery = subtotal > 500 ? 0 : 0
  const total = subtotal + delivery

  const handleInitiatePayment = async () => {

    if (!address) {
      toast.error("Please select a delivery address")
      return
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty")
      return
    }

    const orderDetails = {
      userId: user?._id,

      cartItems: cartItems.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        price: Number(item.salePrice ?? item.price),
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

      totalAmount: total,

      orderStatus: "Pending",
      paymentMethod: "PayPal",
      paymentStatus: "Pending",

      orderDate: new Date(),
      orderUpdate: new Date(),

      paymentId: "",
      payerId: "",
    }

    try {

    
      const orderRes = await dispatch(createOrder(orderDetails));

      const orderId = orderRes?.orderId;

      if (!orderId) {
        toast.error("Order creation failed");
        return;
      }
      sessionStorage.setItem("currentOrderId", orderId);
      

     
      const paymentRes = await dispatch(
        capturePayment({
          cartItems: orderDetails.cartItems,
          orderId: orderId,
        })
      );

      const approvalUrl = paymentRes?.approvalUrl;

      console.log("Approval URL:", approvalUrl);

      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        toast.error("Payment initiation failed");
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="relative h-[220px] w-full overflow-hidden">
        <img src={img} alt="checkout" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <Address />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit sticky top-6">

          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="max-h-[250px] overflow-y-auto space-y-3 pr-1">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-sm">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <p className="text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleInitiatePayment}
            className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout