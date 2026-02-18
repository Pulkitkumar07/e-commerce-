import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Productlist = ({ products }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  if (!products?.length) {
    return (
      <div className="col-span-full text-center py-12 text-gray-400">
        No Products Found
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <Card
          key={product._id}
          className="group overflow-hidden bg-white hover:shadow-md transition duration-300 relative border border-gray-100"
        >
          {/* Image */}
          <div className="relative w-full h-45 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-100 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Favourite */}
            <button
              onClick={() => toggleFavourite(product._id)}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:scale-110 transition z-20"
            >
              <Heart
                size={16}
                className={
                  favourites.includes(product._id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 space-y-1">
            <h3 className="text-sm font-medium line-clamp-1">
              {product.title}
            </h3>

            <p className="text-xs text-gray-400">
              {product.brand}
            </p>

            {/* Price + Stock */}
            <div className="flex items-center justify-between pt-1">
              <div>
                {product.salePrice ? (
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">
                      ₹{product.salePrice}
                    </span>
                    <span className="line-through text-gray-400 text-xs">
                      ₹{product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-semibold">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  product.stock > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out"}
              </span>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
              className="w-full mt-2 h-8 text-xs flex items-center justify-center gap-1"
            >
              <ShoppingCart size={14} />
              Add
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Productlist;
