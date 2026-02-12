import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchProducts } from "@/store/actions/adminaction";
import { Edit3, Trash2, Box, Tag } from "lucide-react";
import { asyncDeleteProduct } from "../../store/actions/adminaction.jsx";

const ProductLists = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(asyncFetchProducts());
  }, [dispatch]);

  const onDelete=(id)=>{
    dispatch(asyncDeleteProduct(id))
    

  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-300">
        <Box size={48} strokeWidth={1} />
        <p className="mt-2 text-sm font-light uppercase tracking-widest">Catalog Empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 p-4 bg-white">
      {products.map((prod) => (
        <div key={prod._id} className="group flex flex-col relative">
          
        
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
            <img
              src={prod.imageUrl}
              alt={prod.title}
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
            
     
            {prod.salePrice && (
              <div className="absolute top-0 left-0 bg-[#ff3f6c] text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 uppercase tracking-tighter">
                <Tag size={10} strokeWidth={3} /> Sale
              </div>
            )}

      
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-2">
               <button 
                onClick={() => onEdit(prod)}
                className="flex-1 bg-white/90 backdrop-blur-sm py-2 text-[10px] font-bold text-gray-900 flex items-center justify-center gap-1 hover:bg-white transition-colors uppercase shadow-sm"
              >
                <Edit3 size={12} /> Edit
              </button>
              <button 
                onClick={() => onDelete(prod._id)}
                className="flex-1 bg-black/80 text-white py-2 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-black transition-colors uppercase shadow-sm"
              >
                <Trash2 size={12} /> Del
              </button>
            </div>
          </div>

          
          <div className="mt-3 space-y-0.5 px-1">
            <h3 className="text-[13px] font-bold text-gray-900 truncate uppercase tracking-tight">
              {prod.brand || "Private Label"}
            </h3>
            <p className="text-[12px] text-gray-500 truncate font-light">
              {prod.title}
            </p>
            
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[13px] font-bold text-gray-900">₹{prod.price}</span>
              {prod.salePrice && (
                <>
                  <span className="text-[11px] text-gray-400 line-through">₹{prod.salePrice}</span>
                  <span className="text-[11px] font-bold text-orange-500">
                    ({Math.round(((prod.salePrice - prod.price) / prod.salePrice) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

   
            <p className={`text-[10px] font-bold uppercase tracking-tighter mt-1 ${prod.stock < 10 ? 'text-[#ff3f6c]' : 'text-gray-400'}`}>
              {prod.stock < 10 ? `Only ${prod.stock} left!` : `Units: ${prod.stock}`}
            </p>
          </div>

         
          <div className="flex md:hidden border-t border-gray-100 mt-3 pt-2 gap-4">
             <button onClick={() => onEdit(prod)} className="text-gray-400 hover:text-blue-600"><Edit3 size={16}/></button>
             <button onClick={() => onDelete(prod._id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductLists;