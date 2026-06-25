export const getOrderStatusClass = (status) => {
  if (status === "Delivered") return "bg-green-100 text-green-700";
  if (status === "Cancelled") return "bg-red-100 text-red-700";
  if (status === "Shipped") return "bg-blue-100 text-blue-700";
  return "bg-yellow-100 text-yellow-700";
};
