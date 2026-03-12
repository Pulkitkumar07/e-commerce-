import Order from "../../components/shopping-view/order"
import Address from "../../components/shopping-view/address"
import accImg from "../../assets/account.jpg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

const ShoppingAccount = () => {
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
              <Order/>
            </TabsContent>

            <TabsContent value="Address" className="mt-6">
              <Address/>
            </TabsContent>

          </Tabs>

        </div>
      </div>

    </div>
  )
}

export default ShoppingAccount

