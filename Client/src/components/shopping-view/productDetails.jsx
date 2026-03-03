import { Dialog, DialogContent } from "../../components/ui/dialog"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { StarIcon } from "lucide-react"
import { useDispatch } from "react-redux"
import { addtoCart } from "../../store/actions/cartAction.jsx"
import { asyncClearProductDetails } from "@/store/actions/productaction.jsx"
import { toast } from "react-toastify"
const ProductDetails = ({ open, setDetailsOpen, productDetails }) => {
  const dispatch = useDispatch();


  const user = JSON.parse(localStorage.getItem("user")) || null;


  const handleAddToCart = () => {
    if (!user?.id) {
      alert("Please login first");
      return;
    }

    if (!productDetails?._id) return;

    dispatch(
      addtoCart(user.id, productDetails._id, 1)
    );
     toast.success("Product added to cart!");
    setDetailsOpen(false);
  };


  if (!productDetails) return null;

  const handleDialogClose = () => {
    setDetailsOpen(false);
    dispatch(asyncClearProductDetails());
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-[70vw] h-[90vh] p-4 sm:p-8 flex flex-col">

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetails?.imageUrl}
                alt={productDetails?.title}
                className="aspect-square w-full object-cover rounded-lg"
              />
            </div>

      
            <div className="grid gap-6">

             
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
                  {productDetails?.title}
                </h1>
                <p className="text-muted-foreground capitalize text-base sm:text-lg mt-3">
                  {productDetails?.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4">
                <p
                  className={`text-xl sm:text-2xl font-bold ${productDetails?.salePrice > 0
                      ? "text-muted-foreground line-through"
                      : "text-primary"
                    }`}
                >
                  ₹{productDetails?.price}
                </p>

                {productDetails?.salePrice > 0 &&
                  productDetails?.salePrice < productDetails?.price && (
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      ₹{productDetails?.salePrice}
                    </p>
                  )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-primary"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  (4.5)
                </span>
              </div>

              {/* Add To Cart */}
              <Button onClick={handleAddToCart} className="w-full">
                Add To Cart
              </Button>

              <Separator />

              {/* Reviews */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold">Reviews</h2>

                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>PC</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-bold">Pulkit Chaudhary</h3>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4 fill-primary"
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground text-sm">
                      This is an awesome product!
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a review..."
                  className="flex-1 border rounded-md px-3 py-2"
                />
                <Button>Submit</Button>
              </div>

            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;