import Order from "../../components/shopping-view/order"
import Address from "../../components/shopping-view/address"
import accImg from "../../assets/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import ShopOrder from "../../components/shopping-view/order.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllOrders } from "../../store/actions/orderAction.jsx"



const ShoppingAccount = () => {
  const userId = useSelector((state) => state.user.user?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getAllOrders(userId));
    }
  }, [dispatch]);
  const orders=useSelector((state)=>state.orderList.orders);
  

  return (
    <div className="flex flex-col min-h-screen ">


      <div className="relative h-[280px] md:h-[350px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account Banner"
          className="h-full w-full object-cover"
        />
      </div>


      <div className="container mx-auto px-4 py-10">
        <div className="rounded-xl border  p-6 shadow-md">

          <Tabs defaultValue="orders">


            <TabsList className="flex gap-3">
              <TabsTrigger
                value="orders"
                className="px-5 py-2 rounded-full border text-sm font-medium transition 
    data-[state=active]:bg-black data-[state=active]:text-white 
    hover:bg-gray-100"
              >
                Orders
              </TabsTrigger>

              <TabsTrigger
                value="Address"
                className="px-5 py-2 rounded-full border text-sm font-medium transition 
    data-[state=active]:bg-black data-[state=active]:text-white 
    hover:bg-gray-100"
              >
                Address
              </TabsTrigger>
            </TabsList>


            <TabsContent value="orders" className="mt-6">
              <ShopOrder orders={orders} />
            </TabsContent>

            <TabsContent value="Address" className="mt-6">
              <Address />
            </TabsContent>

          </Tabs>

        </div>
      </div>

    </div>
  )
}

export default ShoppingAccount

