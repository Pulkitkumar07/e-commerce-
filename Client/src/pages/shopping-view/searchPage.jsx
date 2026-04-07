import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "@/store/actions/searchAction";
import { useSearchParams } from "react-router-dom";
import Productlist from "../shopping-view/productlist.jsx";
import { asyncFetchProductDetails } from "@/store/actions/productaction.jsx";
import { addtoCart } from "@/store/actions/cartAction.jsx";
import { toast } from "react-toastify";
import ProductDetails from "@/components/shopping-view/productDetails.jsx";
import { clearResults } from "@/store/reducers/searchSlice.js";
const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { isLoading, searchResults } = useSelector(
    (state) => state.shopSearchslice
  );
  const productDetails = useSelector((state) => state.shopProduct.productDetails)
  const cartItems = useSelector((state) => state.cartProduct.cartItems);
  const userData = useSelector((state) => state.user.user);
  const user = userData?._id;
   const [openDetails, setDetailsOpen] = useState(false);

  useEffect(() => {
  return () => {
    dispatch(clearResults());   
  };
}, [dispatch]);

  useEffect(() => {
    const query = searchParams.get("keyword");
    if (query) {
      setKeyword(query);
    }
  }, []);

    useEffect(() => {
    if (productDetails !== null) setDetailsOpen(true)
  }, [productDetails])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim().length >= 2) {
        setSearchParams({ keyword });
        dispatch(getSearchResults(keyword));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, dispatch, setSearchParams]);

 
  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      setSearchParams({ keyword });
      dispatch(getSearchResults(keyword));
    }
  };


  const handleProductDetails = (id) => {
    dispatch(asyncFetchProductDetails(id));
  };


  const handleAddToCart = (productId, stock) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const items = Array.isArray(cartItems) ? cartItems : [];

    const index = items.findIndex((item) => item.productId === productId);

    if (index > -1) {
      const qty = items[index].quantity;

      if (qty + 1 > stock) {
        toast.error("Stock limit reached");
        return;
      }

      dispatch(addtoCart(user, productId, qty + 1));
      toast.success("Quantity updated!");
      return;
    }

    if (stock < 1) {
      toast.error("Out of stock");
      return;
    }

    dispatch(addtoCart(user, productId, 1));
    toast.success("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4  md:px-10">

   
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Search Products
        </h1>

        <div className="flex bg-white shadow-md rounded-2xl overflow-hidden">
          <input
            type="text"
            value={keyword}
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-3 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-6"
          >
            Search
          </button>
        </div>
      </div>

      {/* 📦 Results */}
      <div className="max-w-6xl mx-auto">

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500 animate-pulse">
            Searching...
          </p>
        )}

        {/* Products */}
        {!isLoading && searchResults?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Productlist
              products={searchResults}
              handleProductDetails={handleProductDetails}
              handleAddToCart={handleAddToCart}
            />
          </div>
        )}
        <ProductDetails open={openDetails} setDetailsOpen={setDetailsOpen} productDetails={productDetails}/>

        {/* Empty */}
        {!isLoading && keyword.trim() !== "" && searchResults?.length === 0 && (
          <p className="text-center text-gray-500">
            No products found 😔
          </p>
        )}

      </div>
    </div>
  );
};

export default SearchPage;