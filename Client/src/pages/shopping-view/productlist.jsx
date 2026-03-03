import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const Productlist = ({ products, handleProductDetails ,handleAddToCart}) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
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
          className="overflow-hidden bg-white hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100"
        >
          {/* Image Section */}
          <div
            onClick={() => handleProductDetails(product._id)}
            className="relative w-full h-56 overflow-hidden cursor-pointer"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-3 space-y-1">
            <h3
              onClick={()=>handleProductDetails(product._id)}
              className="text-sm font-medium truncate cursor-pointer"
            >
              {product.title}
            </h3>

            <p className="text-xs text-gray-500">
              {product.brand}
            </p>

            {/* Price + Stock */}
            <div className="flex items-center justify-between pt-1">
              <div>
                {product.salePrice ? (
                  <div className="flex items-center gap-2">
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
                className={`text-[10px] px-2 py-1 rounded-full ${
                  product.stock > 0
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out"}
              </span>
            </div>

            
            <Button
            onClick={() => handleAddToCart(product._id)}
              disabled={product.stock === 0}
              className="w-full mt-3 h-9 text-xs flex items-center justify-center gap-2 rounded-lg"
            >
              <ShoppingCart size={14} />
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Productlist;