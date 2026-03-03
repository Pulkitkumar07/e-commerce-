
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./cartContent.jsx";

const CartWrapper = ({ cartItems }) => {

  return (
   <SheetContent className="w-full sm:max-w-md p-6 flex flex-col h-screen">

  
  <SheetHeader className="pb-3 border-b">
    <SheetTitle className="text-lg font-bold">
      Your Cart
    </SheetTitle>
  </SheetHeader>

 
  <div className="flex-1 mt-3  space-y-3 overflow-y-auto pr-1">

    {cartItems && cartItems.length > 0 ? (
      cartItems.map((item) => (
        <CartContent
          key={item._id}
          cartItem={item}
        />
      ))
    ) : (
      <div className="text-center text-muted-foreground mt-10">
        Your cart is empty.
      </div>
    )}

  </div>

  {/* Footer */}
  <div className="pt-4 border-t space-y-4">
    <div className="flex justify-between text-base font-semibold">
      <span>Total:</span>
     <span>₹{cartItems && cartItems.reduce((total,item)=>{
        return total + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity;
      },0)}</span>
 
    </div>

    <Button className="w-full bg-black text-white hover:bg-black/90">
      Checkout
    </Button>
  </div>

</SheetContent>
  );
};

export default CartWrapper; 