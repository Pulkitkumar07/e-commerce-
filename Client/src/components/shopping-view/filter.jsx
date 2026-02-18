import React from "react";

const Filter = ({ filters, handleFilter, clearFilters }) => {
  const categories = ["Men", "Women", "Kids", "Footwear", "Accessories"];
  const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M"];
  const prices = ["0-500", "500-1000", "1000-2000", "2000+"];

  return (
    <div className="bg-white border-r shadow-sm rounded-lg">

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="p-4 space-y-6">

        {/* Category */}
        <div>
          <h3 className="font-medium mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className={`flex items-center gap-2 text-sm cursor-pointer ${
                  filters.category.includes(cat) ? "text-blue-600 font-semibold" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={cat}
                  checked={filters.category.includes(cat)}
                  onChange={() => handleFilter("category", cat)}
                  className="accent-blue-500"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h3 className="font-medium mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className={`flex items-center gap-2 text-sm cursor-pointer ${
                  filters.brand.includes(brand) ? "text-blue-600 font-semibold" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={brand}
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleFilter("brand", brand)}
                  className="accent-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h3 className="font-medium mb-3">Price</h3>
          <div className="space-y-2">
            {prices.map((price) => (
              <label
                key={price}
                className={`flex items-center gap-2 text-sm cursor-pointer ${
                  filters.price === price ? "text-blue-600 font-semibold" : ""
                }`}
              >
                <input
                  type="radio"
                  value={price}
                  checked={filters.price === price}
                  onChange={() => handleFilter("price", price)}
                  className="accent-blue-500"
                />
                {price}
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filter;
