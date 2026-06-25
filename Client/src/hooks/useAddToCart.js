import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addtoCart } from "@/store/actions/cartAction.js";

const useAddToCart = ({ userId, cartItems = [] }) => {
  const dispatch = useDispatch();

  const addProductToCart = async ({ productId, stock, quantity = 1 }) => {
    if (!userId) {
      toast.error("Please login first");
      return null;
    }

    if (!productId) {
      return null;
    }

    const existingItem = cartItems.find((item) => item.productId === productId);
    const currentQuantity = existingItem?.quantity || 0;
    const nextQuantity = currentQuantity + quantity;

    if (stock !== undefined && nextQuantity > stock) {
      toast.error(currentQuantity > 0 ? "Stock limit reached" : "Out of stock");
      return null;
    }

    const savedCart = await dispatch(addtoCart(userId, productId, quantity));

    toast.success(currentQuantity > 0 ? "Quantity updated!" : "Product added to cart!");
    return savedCart;
  };

  return addProductToCart;
};

export default useAddToCart;
