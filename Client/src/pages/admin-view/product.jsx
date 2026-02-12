import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ImagePlus, Plus, PackagePlus } from "lucide-react";
import { asyncCreateProduct, asyncFetchProducts } from "@/store/actions/adminaction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductLists from "./product-tile.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showSalePrice, setShowSalePrice] = useState(false);

  const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(asyncFetchProducts());
  }, [dispatch]);

  const handleImageSelect = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
    clearErrors("image");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    await dispatch(asyncCreateProduct(formData));
    dispatch(asyncFetchProducts());
    
    
    reset();
    setPreview(null);
    setOpen(false);
    toast.success("Product added successfully!");
  };

  return (
    <Fragment>
 
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Products Inventory</h1>
          <p className="text-xs text-gray-500">Manage your store catalog and stock</p>
        </div>
        
        <Button 
          onClick={() => setOpen(true)}
          className="bg-[#ff3f6c] hover:bg-[#e73961] text-white rounded-none px-6 font-bold flex gap-2 transition-all shadow-lg shadow-pink-100"
        >
          <Plus size={18} /> ADD NEW PRODUCT
        </Button>
      </div>

   
      <main className="p-2 md:p-6  min-h-screen">
        <div className=" rounded-sm border border-gray-200">
          <ProductLists /> 
        </div>
      </main>

    
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px] transition-all" />
      )}


      <div className={`fixed right-0 top-0 z-[70] h-screen w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out border-l border-gray-100 ${open ? "translate-x-0" : "translate-x-full"}`}>
        
     
        <div className="flex h-20 items-center justify-between border-b px-6 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-50 rounded-lg text-[#ff3f6c]">
              <PackagePlus size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Create Product</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200 transition-all">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="h-[calc(100vh-80px)] overflow-y-auto p-6 space-y-5">
          
        
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Product Visual</label>
            <div
              onClick={() => document.getElementById("product-image-input").click()}
              className={`relative h-48 w-full cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed transition-all flex 
              ${preview ? "border-solid border-gray-200" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
            >
              {preview ? (
                <img src={preview} alt="preview" className="h-full w-full object-contain p-2" />
              ) : (
                <div className="flex flex-col items-center">
                  <ImagePlus size={30} className="mb-2 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500">Upload Image</p>
                </div>
              )}
              <input id="product-image-input" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Product Title</label>
              <Input className="rounded-none border-gray-200 focus:border-black transition-all" placeholder="e.g. Slim Fit Cotton Shirt" {...register("title", { required: true })} />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase">Description</label>
              <Textarea className="rounded-none border-gray-200 min-h-[80px]" placeholder="Add product details..." {...register("description", { required: true })} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Category</label>
                <Input className="rounded-none" placeholder="Men, Women..." {...register("category", { required: true })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Brand</label>
                <Input className="rounded-none" placeholder="HRX, Roadster..." {...register("brand", { required: true })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">MRP (Price)</label>
                <Input type="number" className="rounded-none" placeholder="0.00" {...register("price", { required: true })} />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase">Stock Units</label>
                <Input type="number" className="rounded-none" placeholder="Quantity" {...register("stock", { required: true })} />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer group w-fit">
                <input type="checkbox" className="accent-[#ff3f6c] h-4 w-4" checked={showSalePrice} onChange={() => setShowSalePrice(!showSalePrice)} />
                <span className="text-xs font-bold text-gray-700 group-hover:text-[#ff3f6c]">Set Discount Price?</span>
              </label>
            </div>

            {showSalePrice && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
                <label className="text-[11px] font-bold text-[#ff3f6c] uppercase">Discounted Price</label>
                <Input type="number" className="rounded-none border-pink-100" {...register("salePrice")} />
              </div>
            )}
          </div>

     
          <div className="flex gap-3 pt-6 pb-10">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-none border-gray-900 text-gray-900 hover:bg-gray-50"
              onClick={() => { reset(); setPreview(null); setOpen(false); }}
            >
              CANCEL
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 rounded-none bg-gray-900 hover:bg-black text-white"
            >
              {isLoading ? "UPLOADING..." : "PUBLISH PRODUCT"}
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Product;