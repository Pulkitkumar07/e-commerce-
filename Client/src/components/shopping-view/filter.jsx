import React, { useState } from "react";
import { X, Filter as FilterIcon } from "lucide-react";

const Filter = ({ filters, handleFilter, clearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Men's", "Women", "Kids", "Footwear", "Accessories"];
  const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levis"];
  const prices = ["0-500", "500-1000", "1000-2000", "2000+"];

  return (
    <>
   
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          className="bg-pink-600 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-bold uppercase tracking-wider active:scale-95 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <FilterIcon size={20} /> Filter
        </button>
      </div>

  
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}


      <aside
        className={`
          fixed top-0 left-0 h-full w-[85%] sm:w-80 bg-white z-[70] transform transition-transform duration-300 ease-in-out border-r border-gray-100
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky md:top-20 md:z-10 md:w-64 md:h-[calc(100vh-80px)] md:block
        `}
      >
  
        <div className="p-5 border-b flex justify-between items-center bg-white">
          <h2 className="text-md font-bold uppercase tracking-tight text-gray-800">
            Filters
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-pink-600 uppercase hover:text-pink-700"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

      
        <div className="p-5 overflow-y-auto h-[calc(100%-140px)] md:h-[calc(100%-70px)] custom-scrollbar">
          
     
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wide">Category</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat} className="group flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(cat)}
                      onChange={() => handleFilter("category", cat)}
                      className="peer h-5 w-5 cursor-pointer appearance-none border-2 border-gray-300 rounded-sm checked:bg-pink-600 checked:border-pink-600 transition-all"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-sm transition-colors ${filters.category.includes(cat) ? "text-pink-600 font-semibold" : "text-gray-600 group-hover:text-black"}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

    
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wide">Brand</h3>
            <div className="space-y-3">
              {brands.map((brand) => (
                <label key={brand} className="group flex items-center gap-3 cursor-pointer">
                   <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleFilter("brand", brand)}
                      className="peer h-5 w-5 cursor-pointer appearance-none border-2 border-gray-300 rounded-sm checked:bg-pink-600 checked:border-pink-600 transition-all"
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-sm transition-colors ${filters.brand.includes(brand) ? "text-pink-600 font-semibold" : "text-gray-600 group-hover:text-black"}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

   
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 tracking-wide">Price</h3>
            <div className="space-y-3">
              {prices.map((price) => (
                <label key={price} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={filters.price === price}
                    onChange={() => handleFilter("price", price)}
                    className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className={`text-sm ${filters.price === price ? "text-pink-600 font-semibold" : "text-gray-600 group-hover:text-black"}`}>
                    Rs. {price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

       
      </aside>
    </>
  );
};

export default Filter;