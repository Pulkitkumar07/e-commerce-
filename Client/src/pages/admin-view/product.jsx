import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ImageIcon } from "lucide-react";
import { asyncCreateProduct } from "@/store/actions/adminaction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showSalePrice, setShowSalePrice] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  // ✅ IMAGE HANDLER (IMPORTANT FIX)
  const handleImageSelect = (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    // 👇 react-hook-form ko manually value set
    setValue("image", file, { shouldValidate: true });

    // 👇 error hata do
    clearErrors("image");
  };

  const onSubmit = (data) => {
    // ✅ manual image validation
    if (!data.image) {
      toast.error("Product image is required");
      return;
    }

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.salePrice) {
      formData.append("salePrice", data.salePrice);
    }

   
    formData.append("image", data.image);

  

    dispatch(asyncCreateProduct(formData));
    toast.success("Product created successfully!");
    reset();
    setPreview(null);
    setShowSalePrice(false);
    setOpen(false);
  };

  return (
    <Fragment>
      {/* Top Bar */}
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpen(true)}>Add Product</Button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-background shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-lg font-semibold">Create Product</h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[calc(100vh-64px)] space-y-4 overflow-y-auto p-4"
        >
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input {...register("title", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Input {...register("category", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Brand</label>
            <Input {...register("brand", { required: true })} />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <Input type="number" {...register("price", { required: true })} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showSalePrice}
              onChange={() => setShowSalePrice(!showSalePrice)}
            />
            <label className="text-sm font-medium">Enable Sale Price</label>
          </div>

          {showSalePrice && (
            <div>
              <label className="text-sm font-medium">Sale Price</label>
              <Input type="number" {...register("salePrice")} />
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Stock</label>
            <Input type="number" {...register("stock", { required: true })} />
          </div>

          {/* IMAGE UPLOAD (UI SAME) */}
          <div>
            <label className="text-sm font-medium">Product Image</label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImageSelect(e.dataTransfer.files[0]);
              }}
              onClick={() =>
                document.getElementById("product-image-input").click()
              }
              className="mt-2 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/40 bg-muted/30 text-center transition hover:border-primary"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <ImageIcon size={32} className="mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Drag & drop image here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to browse
                  </p>
                </>
              )}

          
              <input
                id="product-image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageSelect(e.target.files[0])}
              />
            </div>

            {errors.image && (
              <p className="mt-1 text-xs text-destructive">
                Product image is required
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setPreview(null);
                setShowSalePrice(false);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Product;
