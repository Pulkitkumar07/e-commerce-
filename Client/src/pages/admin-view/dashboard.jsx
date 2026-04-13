import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { uploadFeatureImage, getFeatureImages } from "@/store/actions/featureAction";
import { Trash2, ImagePlus, Upload, Loader2, ImageIcon } from "lucide-react";

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const { images, loading } = useSelector((state) => state.Feature || { images: [] });

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    dispatch(uploadFeatureImage(formData)).then(() => {
      setImage(null);
      setPreview(null);
    });
  };

 
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this banner?")) {
      // dispatch(deleteFeatureImage(id));
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Feature Banners</h1>
            <p className="text-slate-500 mt-1">Manage homepage carousel images.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm font-medium text-slate-600">Active Banners: </span>
            <span className="text-sm font-bold text-blue-600">{images?.length || 0}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upload Card */}
          <div className="lg:col-span-4">
            <Card className="sticky top-8 shadow-xl border-none ring-1 ring-slate-200">
              <CardHeader className="bg-slate-50/50 rounded-t-xl">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-blue-500" />
                  New Banner
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                <div className="relative group">
                  {!preview ? (
                    <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500" />
                        <p className="text-sm text-slate-500 font-medium">Click to upload</p>
                      </div>
                      <Input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  ) : (
                    <div className="relative h-44 rounded-xl overflow-hidden ring-2 ring-blue-500 ring-offset-2">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                      <Button 
                        onClick={() => {setImage(null); setPreview(null);}}
                        variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" 
                  onClick={handleUpload}
                  disabled={!image || loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                  ) : (
                    "Publish Banner"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-5 h-5 text-slate-400" />
              <h2 className="text-xl font-bold text-slate-800">Live Banners</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images && images.length > 0 ? (
                images.map((imgItem) => (
                  <div key={imgItem._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={imgItem.imageUrl} // ✅ Handled: Using imageUrl as per your request
                        alt="Feature Banner"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Error+Loading+Image"; }}
                      />
                    </div>
                    
                    <div className="p-3 flex items-center justify-end bg-slate-50/50">
                      <Button 
                        onClick={() => handleDelete(imgItem._id)}
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
                  <h3 className="text-slate-900 font-semibold text-lg">No banners found</h3>
                  <p className="text-slate-500 text-sm">Upload an image to display it on the homepage.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;