import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

import Filter from "../../components/shopping-view/filter.jsx";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchProductDetails, asyncFetchProducts } from "@/store/actions/productaction.jsx";
import Productlist from "../shopping-view/productlist";
import { useSearchParams } from "react-router-dom";
import ProductDetails from '../../components/shopping-view/productDetails.jsx'
import { toast } from "react-toastify";
import { addtoCart } from "../../store/actions/cartAction.jsx";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shopProduct.products);
  const productDetails=useSelector((state)=>state.shopProduct.productDetails)

  const [searchParams, setSearchParams] = useSearchParams();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const filters = {
    category: searchParams.get("category")?.split(",") || [],
    brand: searchParams.get("brand")?.split(",") || [],
    price: searchParams.get("price") || null,
  };
  const sortOption = searchParams.get("sort") || "price-low";
  const [openDetails,setDetailsOpen]=useState(false);

  useEffect(() => {
    dispatch(asyncFetchProducts(filters, sortOption));
  }, [searchParams]);

  const handlerFilter = (section, option) => {
    const newParams = new URLSearchParams(searchParams);

    if (section === "price") {
      if (newParams.get("price") === option) {
        newParams.delete("price");
      } else {
        newParams.set("price", option);
      }
    } else {
      const current = newParams.get(section)?.split(",") || [];

      if (current.includes(option)) {
        const updated = current.filter((item) => item !== option);

        if (updated.length > 0) {
          newParams.set(section, updated.join(","));
        } else {
          newParams.delete(section);
        }
      } else {
        newParams.set(section, [...current, option].join(","));
      }
    }

    setSearchParams(newParams);
  };
  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };
  
  

  useEffect(()=>{
  if(productDetails!==null) setDetailsOpen(true)
  },[productDetails])

  const handleProductDetails=(id)=>{
   dispatch(asyncFetchProductDetails(id))
  }
const handleAddToCart = (productId) => {

  if (!user?.id) {
    toast.error("Please login first");
    return;
  } 
  console.log("Adding to cart:", { userId: user.id, productId, quantity: 1 });

  if (!productId) return;

  dispatch(addtoCart(user.id, productId, 1));
  toast.success("Product added to cart!");
};


  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6">

      <Filter
        filters={filters}
        clearFilters={clearFilters}
        handleFilter={handlerFilter}
      />

      <div className="bg-background w-full shadow-sm">

        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">

          <h2 className="text-xl font-bold">
            All Products
          </h2>

          <div className="flex items-center gap-4">

            <span className="text-muted-foreground">
              {products?.length || 0} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px] mt-2">

                <DropdownMenuItem onClick={() => handleSortChange("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleSortChange("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleSortChange("title-asc")}>
                  Title: A to Z
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleSortChange("title-desc")}>
                  Title: Z to A
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          <Productlist products={products} handleProductDetails={handleProductDetails} handleAddToCart={handleAddToCart}  />
        </div>

      </div>
      <ProductDetails open={openDetails}  setDetailsOpen={setDetailsOpen} productDetails={productDetails} 
 />
    </div>
  );
};


export default ShoppingListing;
