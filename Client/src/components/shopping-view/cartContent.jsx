import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../store/actions/cartAction.jsx";
import { toast } from "react-toastify";
import { updateCartItemQty } from "../../store/actions/cartAction.jsx";

const CartContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("Cart Item in CartContent:", user);

  const userId = user?.user?._id;
  const HandleDeleteFromCart = () => {
  console.log("Deleting from cart:", { userId, productId: cartItem.productId });
  dispatch(deleteCartItem(userId, cartItem.productId));
  toast.success("Item removed from cart successfully!");
  }
  const HandleUpdateQty = (productId, action) => {
    
    if (action==="plus"){
      dispatch(updateCartItemQty(userId, productId, cartItem.quantity + 1));
      toast.success("Cart item quantity updated successfully!");
    }else if (action==="minus" && cartItem.quantity > 1){
      dispatch(updateCartItemQty(userId, productId, cartItem.quantity - 1));
      toast.success("Cart item quantity updated successfully!");
    }else{
      dispatch(deleteCartItem(userId, productId));
      toast.success("Item removed from cart successfully!");
    }
  }
  
  return (
    <div className="flex  items-center gap-4 border-b pb-2">

    
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      
      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {cartItem?.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          ₹{cartItem.price}
        </p>

        
        <div className="flex items-center gap-3 mt-3">
          <Button
           onClick={()=>HandleUpdateQty(cartItem.productId,"minus")}
           variant="outline" size="sm" className="w-8 h-8 p-0">
            -
            
          </Button>

          <span className="text-base font-medium">
            {cartItem?.quantity}
          </span>

          <Button
           onClick={()=>HandleUpdateQty(cartItem.productId, "plus")}
           variant="outline" size="sm" className="w-8 h-8 p-0">
            +
          </Button>
        </div>
      </div>

     
      <div className="flex flex-col items-end gap-4">
        <button
        onClick={()=>HandleDeleteFromCart()}
         className="text-red-500 hover:text-red-600">
          <Trash2 size={18} />
        </button>

        <p className="font-semibold text-lg">
          ₹{cartItem?.salePrice > 0 ? cartItem.salePrice * cartItem.quantity : cartItem.price * cartItem.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartContent;  