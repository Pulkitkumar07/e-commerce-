import Orders from "../../models/Order.js";


const getOrderOfallUsers=async(req,res)=>{
  
  
  try{
  

   const order= await Orders.find({}).sort({orderDate:-1});
   if(!order){
    return res.status(404).json({
      success:false,
      message:"Order not found"
    })
   }
   return res.json({
    success:true,
    data:order
   })

 
  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}

const getOrderDetails=async(req,res)=>{
  
  try{
   const {id}= req.params;
    if(!id){
    return res.status(400).json({
      success:false,
      message:"Missing order id"
    })
   }
   const order= await Orders.findById(id);
   if(!order){
    return res.status(404).json({
      success:false,
      message:"Order not found"
    })
   }
   return res.json({
    success:true,
    data:order
   })

 
  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
}

const updateOrderStatus=async(req,res)=>{
  try{
    const {id}= req.params;
    const {status}= req.body;
    if(!id || !status){
      return res.status(400).json({
        success:false,
        message:"Missing order id or status"
      })
     }
     const order= await Orders.findByIdAndUpdate(id,{orderStatus:status},{new:true});
     if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
     }
     return res.json({
      success:true,
      message:"Order status updated",
     })

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Server Error"
    })
  }
} 

export default { getOrderOfallUsers, getOrderDetails, updateOrderStatus };
