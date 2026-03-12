import Address from '../../models/Address.js';
export const addAddress = async (req, res) => {
    try{
        const { userId, address, city, pincode, phone, notes } = req.body;
        if (!userId || !address || !city || !pincode || !phone) {
            return res.status(400).json({ message: 'All fields except notes are required' });
        }
        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        });
        await newAddress.save();
        res.status(201).json({ message: 'Address added successfully', address: newAddress });

    }catch(error){
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const fetchAllAddresses = async (req, res) => {
    try{
      const { userId } = req.params;
      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }
      const addressesList = await Address.find({ userId });
      res.status(200).json({ addresses: addressesList });
    }catch(error){
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const editAddress = async (req, res) => {
    try{
        const { userId, addressId } = req.params;
        const { address, city, pincode, phone, notes } = req.body;
        if (!userId || !addressId) {
            return res.status(400).json({ message: 'User ID and Address ID are required' });
        }
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { userId, address, city, pincode, phone, notes },
            { new: true }
        );
        
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    }catch(error){
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteAddress = async (req, res) => {
    try{ 
      const { userId, addressId } = req.params;
      
        if (!userId || !addressId) {
            return res.status(400).json({ message: 'User ID and Address ID are required' });
        }
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted successfully' });
    }catch(error){
        console.log("err :" + error);
        res.status(500).json({ message: 'Server error' });
    }
}

