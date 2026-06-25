import Address from "../../models/Address.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendError, sendSuccess } from "../../utils/apiResponse.js";

export const addAddress = asyncHandler(async (req, res) => {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone) {
        return sendError(res, "All fields except notes are required", 400);
    }

    const newAddress = new Address({
        userId,
        address,
        city,
        pincode,
        phone,
        notes,
    });

    await newAddress.save();
    return sendSuccess(res, { address: newAddress }, "Address added successfully", 201);
});

export const fetchAllAddresses = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return sendError(res, "User ID is required", 400);
    }

    const addressesList = await Address.find({ userId });
    return sendSuccess(res, { addresses: addressesList }, "Addresses fetched");
});

export const editAddress = asyncHandler(async (req, res) => {
    const { userId, addressId } = req.params;
    const { address, city, pincode, phone, notes } = req.body;

    if (!userId || !addressId) {
        return sendError(res, "User ID and Address ID are required", 400);
    }

    const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { userId, address, city, pincode, phone, notes },
        { new: true }
    );

    if (!updatedAddress) {
        return sendError(res, "Address not found", 404);
    }

    return sendSuccess(res, { address: updatedAddress }, "Address updated successfully");
});

export const deleteAddress = asyncHandler(async (req, res) => {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
        return sendError(res, "User ID and Address ID are required", 400);
    }

    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
        return sendError(res, "Address not found", 404);
    }

    return sendSuccess(res, null, "Address deleted successfully");
});
