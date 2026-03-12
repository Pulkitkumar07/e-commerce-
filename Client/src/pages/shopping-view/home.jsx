import { BabyIcon, ChevronLeft, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import Img1 from '../../assets/banner-1.webp'
import Img2 from '../../assets/banner-2.webp'
import Img3 from '../../assets/banner-3.webp'
import Img4 from '../../assets/img1.jpg'
import Img5 from '../../assets/img2.jpg'
import Img6 from '../../assets/img3.jpg'
import { Button } from '../../components/ui/button'
import { useEffect, useState } from 'react'
import { asyncFetchProducts, asyncFetchProductDetails } from '@/store/actions/productaction'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductDetails from '../../components/shopping-view/productDetails.jsx'
import { addtoCart } from "../../store/actions/cartAction.jsx"
import { toast } from "react-toastify"

const ShoppingHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const images = [Img1, Img2, Img3, Img4, Img5, Img6];
  const { products, productDetails } = useSelector((state) => state.shopProduct);
  const [openDetails, setDetailsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const Categories = [
    { id: "Men's", label: "Men", icon: ShirtIcon },
    { id: "Women", label: "Women", icon: CloudLightning },
    { id: "Kids", label: "Kids", icon: BabyIcon },
    { id: "Accessories", label: "Accessories", icon: WatchIcon },
    { id: "Footwear", label: "Footwear", icon: UmbrellaIcon }
  ];

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch Products on Mount
  useEffect(() => {
    dispatch(asyncFetchProducts({ filters: {}, sortOption: null }));
  }, [dispatch]);

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
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (!user?.id) {
      toast.error("Please login first"); 
      return;
    } 
    console.log("Adding to cart:", { userId: user.id, productId: id, quantity: 1 });
    dispatch(addtoCart(user.id, id, 1));
    toast.success("Product added to cart!");
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Banner Section */}
      <div className='relative w-full h-[300px] md:h-[600px] overflow-hidden'>
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Banner ${index + 1}`} 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
          />
        ))}
        <Button
          onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
          variant='outline' size='icon' 
          className="absolute top-1/2 left-4 transform bg-white/80 hover:bg-white text-black -translate-y-1/2">
          <ChevronLeft className='w-6 h-6' />
        </Button>
        <Button
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          variant='outline' size='icon' 
          className="absolute top-1/2 right-4 transform bg-white/80 hover:bg-white text-black -translate-y-1/2">
          <ChevronLeft className='w-6 h-6 rotate-180' />
        </Button>
      </div>

      {/* Categories Section */}
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

      {/* Featured Products Section */}
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Featured Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <div key={product._id} className='group border rounded-lg p-4 hover:shadow-lg transition-shadow'>
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
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </section>

      
      <ProductDetails 
        open={openDetails} 
        setDetailsOpen={setDetailsOpen} 
        productDetails={productDetails} 
      />
    </div>
  );
};

export default ShoppingHome;