import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  fetchAddresses,
  updateAddress,
  deleteAddress,
} from "@/store/actions/addressAction.js";
import AddressCard from "./addressCard";

const addressFormControls = [
  { label: "Address", name: "address", type: "text", placeholder: "Enter full address" },
  { label: "City", name: "city", type: "text", placeholder: "Enter city" },
  { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter pincode" },
  { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number" },
  { label: "Notes", name: "notes", type: "text", placeholder: "Additional notes (optional)" },
];

const Address = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);
  const addresses = useSelector(
    (state) => state.addressList.addresses || []
  );

  const [editingAddressId, setEditingAddressId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (userId) dispatch(fetchAddresses(userId));
  }, [dispatch, userId]);

  const emptyForm = () => {
    reset({
      address: "",
      city: "",
      pincode: "",
      phone: "",
      notes: "",
    });
  };

  const handleManageAddresses = async (data) => {
    if (!userId) return toast.error("User not logged in!");

    try {
      if (editingAddressId) {
        await dispatch(updateAddress(userId, editingAddressId, data));
        toast.success("Address updated!");
        setEditingAddressId(null);
        emptyForm();
      } else {
        await dispatch(createAddress({ ...data, userId }));
        toast.success("Address added!");
        emptyForm();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onEdit = (addressId, address) => {
    setEditingAddressId(addressId);
    reset(address);
  };

  const onDelete = async (userId, addressId) => {
    try {
      await dispatch(deleteAddress(userId, addressId));
      toast.success("Address deleted");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50">

      {/* Address List */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.length > 0 ? (
          addresses.map((item) => (
            <AddressCard
              key={item._id}
              address={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-gray-400 italic col-span-full">
            No Addresses Found
          </p>
        )}
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Form */}
      <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-bold mb-2">
          {editingAddressId ? "Edit Address" : "Add New Address"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Ensure your delivery details are correct.
        </p>

        <form onSubmit={handleSubmit(handleManageAddresses)} className="grid gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addressFormControls.map((field) => (
              <div
                key={field.name}
                className={`flex flex-col gap-1 ${
                  field.name === "address" ? "md:col-span-2" : ""
                }`}
              >
                <label className="text-xs font-semibold text-gray-500">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, {
                    required: field.name !== "notes",
                  })}
                  className="bg-gray-50 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-black/20 outline-none"
                />
              </div>
            ))}
          </div>

          <button className="w-full md:w-fit px-8 bg-black text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
            {editingAddressId ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
