import { BabyIcon, ChevronLeft, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useEffect, useState } from 'react'
import { asyncFetchProducts, asyncFetchProductDetails } from '@/store/actions/productaction'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductDetails from '../../components/shopping-view/productDetails.jsx'
import { addtoCart } from "../../store/actions/cartAction.jsx"
import { toast } from "react-toastify"
import { Link } from "react-router-dom";
import { asyncGetuserProfile } from '../../store/actions/userAction.jsx'
import { getFeatureImages } from "@/store/actions/featureAction";

const ShoppingHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { images } = useSelector((state) => state.Feature || { images: [] });
  const { products, productDetails } = useSelector((state) => state.shopProduct);
  const [openDetails, setDetailsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userId = useSelector((state) => state.user?.user?._id)

  const Categories = [
    { id: "Men's", label: "Men", icon: ShirtIcon },
    { id: "Women", label: "Women", icon: CloudLightning },
    { id: "Kids", label: "Kids", icon: BabyIcon },
    { id: "Accessories", label: "Accessories", icon: WatchIcon },
    { id: "Footwear", label: "Footwear", icon: UmbrellaIcon }
  ];

  useEffect(() => {
    dispatch(asyncGetuserProfile());
    dispatch(getFeatureImages());
    dispatch(asyncFetchProducts({ filters: {}, sortOption: null }));
  }, [dispatch]);

  useEffect(() => {
    if (images && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const HandleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilters = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(`/shop/listing?${section}=${encodeURIComponent(getCurrentItem.id)}`);
  };

  const handleProductDetails = (id) => {
    dispatch(asyncFetchProductDetails(id));
    setDetailsOpen(true);
  };

  const handleAddtoCart = (id) => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }
    dispatch(addtoCart(userId, id, 1));
    toast.success("Product added to cart!");
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[300px] md:h-[600px] overflow-hidden bg-gray-100'>
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={img._id || index}
              src={img.imageUrl}
              alt="Banner"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))
        ) : null}

        {images && images.length > 1 && (
          <>
            <Button
              onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
              variant='outline' size='icon'
              className="absolute top-1/2 left-4 transform bg-white/80 hover:bg-white text-black -translate-y-1/2 rounded-full">
              <ChevronLeft className='w-6 h-6' />
            </Button>
            <Button
              onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
              variant='outline' size='icon'
              className="absolute top-1/2 right-4 transform bg-white/80 hover:bg-white text-black -translate-y-1/2 rounded-full">
              <ChevronLeft className='w-6 h-6 rotate-180' />
            </Button>
          </>
        )}
      </div>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shopping Categories</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {Categories.map((category) => (
              <div
                onClick={() => HandleNavigateToListingPage(category, 'category')}
                key={category.id}
                className='flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100'>
                <category.icon className='w-12 h-12 text-primary mb-4' />
                <span className='text-lg font-medium'>{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <div key={product._id} className='group border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white'>
                  <div className='overflow-hidden rounded-md cursor-pointer' onClick={() => handleProductDetails(product._id)}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='mt-4 text-center'>
                    <h3 className='text-lg font-semibold truncate'>{product.title}</h3>
                    <h4 className='text-xl font-bold text-gray-900 mt-1'>₹{product.price}</h4>
                    <Button
                      className='mt-4 w-full bg-black text-white hover:bg-gray-800 transition-colors'
                      onClick={() => handleAddtoCart(product._id)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full py-10 text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white mt-16">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">ShopEase</h2>
            <p className="text-gray-400">
              Your one-stop shop for all trending products. Quality & affordability guaranteed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop/home" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li><Link to="/shop/listing" className="hover:text-white">Shop</Link></li>
              <li><Link to="/shop/about" className="hover:text-white">About</Link></li>
              <li><Link to="/shop/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Electronics</li>
              <li className="hover:text-white cursor-pointer">Fashion</li>
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Beauty</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to get latest offers & updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-md bg-zinc-900 text-white border border-zinc-700 outline-none focus:border-white"
              />
              <button className="bg-white text-black px-4 rounded-r-md hover:bg-gray-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </footer>

      <ProductDetails
        open={openDetails}
        setDetailsOpen={setDetailsOpen}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;