import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, fetchAddresses, updateAddress, deleteAddress } from "@/store/actions/addressAction.jsx";
import AddressCard from "./addressCard";
import { useState } from "react";
const addressFormControls = [
    { label: "Address", name: "address", type: "text", placeholder: "Enter full address" },
    { label: "City", name: "city", type: "text", placeholder: "Enter city" },
    { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter pincode" },
    { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number" },
    { label: "Notes", name: "notes", type: "text", placeholder: "Additional notes (optional)" }
];

const Address = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.user?._id);
    const addresses = useSelector((state) => state.addressList.addresses?.addresses || []);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userId) dispatch(fetchAddresses(userId));
    }, [dispatch, userId]);

const handleManageAddresses = async (data) => {
    if (!userId) return toast.error("User not logged in!");

    try {
        if (editingAddressId) {
             dispatch(updateAddress(userId, editingAddressId, data));
            toast.success("Address updated successfully!");
            setEditingAddressId(null); 
            emptyForm() 
            
        } else {
            dispatch(createAddress({ ...data, userId }));
            toast.success("Address saved successfully!");
        }
        
    } catch (err) {
        toast.error("Failed to save address");
    }
};

    const onEdit = (addressId, address) => {
        setEditingAddressId(addressId); 
        reset({
            address: address.address,
            city: address.city,
            pincode: address.pincode,
            phone: address.phone,
            notes: address.notes || "",
        });
    };
    const emptyForm = () => {
  
    reset({
        address: "",
        city: "",
        pincode: "",
        phone: "",
        notes: "",
    });
};

    const onDelete = (userId, addressId) => {
        console.log("adsd", userId, addressId)
        dispatch(deleteAddress(userId, addressId))
        toast.success("Address Delete Successfully")


    }

    return (
       
        <div className="p-6 bg-white min-h-screen">

            
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                    <p className="text-gray-400 text-sm italic col-span-full">No Addresses Found</p>
                )}
            </div>

            <hr className="border-gray-700 mb-10" />


            <div className="max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
                    <p className="text-sm text-gray-500">Ensure your delivery details are up to date.</p>
                </div>

                <form onSubmit={handleSubmit(handleManageAddresses)} className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addressFormControls.map((field) => (
                            <div key={field.name} className={`flex flex-col gap-1.5 ${field.name === 'address' ? 'md:col-span-2' : ''}`}>
                                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-400 ml-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    {...register(field.name, { required: field.name !== "notes" })}
                                    className="bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20 rounded-lg p-3 text-sm transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full md:w-max px-10 bg-black text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-95"
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Address;