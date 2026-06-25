import Address from '@/components/shopping-view/address'
import CheckoutSummary from '@/components/shopping-view/checkoutSummary.jsx'
import img from '../../assets/account.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createOrder, capturePayment } from '@/store/actions/orderAction.js'
import { buildOrderPayload, getCartItemsFromState, getCartSubtotal } from '@/lib/order.js'

const ShoppingCheckout = () => {

  const dispatch = useDispatch()

  const cartState = useSelector((state) => state.cartProduct)
  const user = useSelector((state) => state.user?.user)
  const address = useSelector((state) => state.addressList.selectedAddress)

  const cartItems = getCartItemsFromState(cartState)
  const subtotal = getCartSubtotal(cartItems)

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

    const orderDetails = buildOrderPayload({
      userId: user?._id,
      cartItems,
      address,
      totalAmount: total,
    })

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

      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        toast.error("Payment initiation failed");
      }

    } catch (error) {
      toast.error(error.normalizedMessage || "Something went wrong")
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

        <CheckoutSummary
          cartItems={cartItems}
          subtotal={subtotal}
          delivery={delivery}
          total={total}
          onPlaceOrder={handleInitiatePayment}
        />
      </div>
    </div>
  )
}

export default ShoppingCheckout
