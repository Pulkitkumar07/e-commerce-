import { Separator } from "@radix-ui/react-dropdown-menu";

import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { asyncClearProductDetails } from "@/store/actions/productaction.js";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import StarRating from "../common/starRating.jsx";
import { useState, useEffect } from "react";
import { addReview, getReview } from "@/store/actions/reviewAction.js";
import useAddToCart from "@/hooks/useAddToCart.js";

const ProductDetails = ({ open, setDetailsOpen, productDetails }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const cartItems = useSelector((state) => state.cartProduct.cartItems);
  const { reviews } = useSelector((state) => state.review);
  const addProductToCart = useAddToCart({ userId: user?._id, cartItems });

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const productId = productDetails?._id;

  useEffect(() => {
    if (productId && open) dispatch(getReview(productId));
  }, [dispatch, productId, open]);

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length 
    : 0;

  if (!productDetails) return null;

  const handleAddToCart = () => {
    addProductToCart({ productId, stock: productDetails?.stock });
  };

  const handleReviewSubmit = () => {
    if (!user) return toast.error("Login required");
    if (reviewText.trim().length < 3 || rating === 0) return toast.error("Fill all fields");

    dispatch(addReview({
      productId,
      userId: user._id,
      userName: user.userName || user.username,
      reviewMessage: reviewText,
      reviewValue: rating,
    })).then(() => toast.success("Review submitted!"));

    setRating(0);
    setReviewText("");
  };

  return (
    <Dialog open={open} onOpenChange={() => { setDetailsOpen(false); dispatch(asyncClearProductDetails()); }}>
      <DialogContent className="max-w-[95vw] lg:max-w-[55vw] max-h-[90vh] p-4 flex flex-col overflow-hidden">
        <div className="overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* LEFT: Image */}
            <div className="w-full">
              <img
                src={productDetails?.imageUrl}
                alt={productDetails?.title}
                className="aspect-square w-full object-cover rounded-md shadow-sm"
              />
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col gap-2">
              <div className="mb-1">
                <h1 className="text-lg font-bold capitalize leading-tight">{productDetails?.title}</h1>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">{productDetails?.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className={`text-base font-bold ${productDetails?.salePrice > 0 ? "line-through text-gray-400 text-xs" : "text-primary"}`}>
                  ₹{productDetails?.price}
                </p>
                {productDetails?.salePrice > 0 && <p className="text-lg font-bold text-red-600">₹{productDetails?.salePrice}</p>}
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} className={`w-3 h-3 ${s <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
                <span className="text-[10px] ml-1">({reviews?.length || 0})</span>
              </div>

              <Button size="sm" className="w-full h-8 text-xs" onClick={handleAddToCart} disabled={productDetails?.stock === 0}>
                {productDetails?.stock === 0 ? "Out of Stock" : "Add To Cart"}
              </Button>

              <Separator className="my-1 opacity-50" />

              {/* REVIEWS SECTION - Compact with scroll */}
              <div className="flex-1 max-h-[120px] overflow-y-auto space-y-2">
                <h2 className="text-[11px] font-bold uppercase tracking-wider sticky top-0 bg-white pb-1">Reviews</h2>
                {reviews?.length > 0 ? reviews.map((r) => (
                  <div key={r._id} className="flex gap-2 border-b border-gray-100 pb-1 last:border-0">
                    <Avatar className="h-5 w-5"><AvatarFallback className="text-[8px]">{r.userName?.[0]}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold">{r.userName}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight italic">"{r.reviewMessage}"</p>
                    </div>
                  </div>
                )) : <p className="text-[10px] text-gray-400">No reviews yet.</p>}
              </div>

              {/* COMPACT INPUT AREA */}
              <div className="bg-gray-50 p-2 rounded-md space-y-1">
                <div className="flex justify-between items-center">
                  <Label className="text-[10px] font-bold uppercase">Rate this</Label>
                  <StarRating rating={rating} setRating={setRating} size={14} />
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Review..."
                  className="w-full border rounded p-1 text-[11px] h-10 resize-none bg-white"
                />
                <Button size="sm" className="w-full h-7 text-[10px]" onClick={handleReviewSubmit}>Submit Review</Button>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
