import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

import Filter from "../../components/shopping-view/filter.jsx";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchProducts } from "@/store/actions/productaction.jsx";
import Productlist from "../shopping-view/productlist";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shopProduct.products);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: null,
  });


  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(asyncFetchProducts());
  }, [dispatch]);

  useEffect(()=>{

  })

  const sortedProducts = [...(products || [])].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const handlerFilter = (section, option) => {

    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (section === "price") {
        updatedFilters.price = option;
      } else {
        // category & brand multi select
        if (updatedFilters[section].includes(option)) {
          // agar already selected hai → remove
          updatedFilters[section] = updatedFilters[section].filter(
            (item) => item !== option
          );
        } else {
          // agar selected nahi hai → add
          updatedFilters[section] = [
            ...updatedFilters[section],
            option,
          ];
        }
      }
      return updatedFilters;
    })
   sessionStorage.setItem("filters",JSON.stringify(filters))
  }
  useEffect(()=>{
  setSortOption('Price: Low to High')
  setFilters(JSON.parse(sessionStorage.getItem("filters")||{}))
  },[])
  

  
  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      price: null,
    });
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6">


      <Filter filters={filters} clearFilters={clearFilters} handleFilter={handlerFilter} />


      <div className="bg-background w-full  shadow-sm">


        <div className="p-4 border-b flex items-center justify-between">

          <h2 className="text-xl font-bold">
            All Products
          </h2>

          <div className="flex items-center gap-4">

            <span className="text-muted-foreground">
              {sortedProducts.length} Products
            </span>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px] mt-2">

                <DropdownMenuItem onClick={() => setSortOption("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setSortOption("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setSortOption("title-asc")}>
                  Title: A to Z
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setSortOption("title-desc")}>
                  Title: Z to A
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
          <Productlist products={sortedProducts} />
        </div>

      </div>
    </div>
  );
};

export default ShoppingListing;
