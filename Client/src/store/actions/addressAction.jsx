import cart from '@/pages/shopping-view/cart.jsx';
import axios from '../../api/api.jsx';
import { addressStart, addAddress, loadAddresses, addressFail, } from '../reducers/addressSlice';


export const createAddress = (addressData) => async (dispatch) => {
    dispatch(addressStart());
    console.log("Creating address with data:", addressData);
    try {
        const res = await axios.post('/api/shop/address/add', addressData);
        dispatch(loadAddresses(res.data));
        dispatch(fetchAddresses(addressData.userId));

    } catch (error) {
        console.error('Error creating address:', error);
        dispatch(addressFail(error.message));
    }
};

export const fetchAddresses = (userId) => async (dispatch) => {
    dispatch(addressStart());
    try {
        const res = await axios.get(`/api/shop/address/all/${userId}`);
        
        dispatch(loadAddresses(res.data));
        
    }catch(error){
        console.error('Error fetching addresses:', error);
        dispatch(addressFail(error.message));
    }
}

export const updateAddress = (userId, addressId, addressData) => async (dispatch) => {
    dispatch(addressStart());
    try {
      
        const res = await axios.put(`/api/shop/address/edit/${userId}/${addressId}`, addressData);

        
        dispatch(fetchAddresses(userId));
    } catch (error) {
        console.error('Error updating address:', error);
        dispatch(addressFail(error.message));
    }
};

export const deleteAddress = ( userId, addressId ) => async (dispatch) => {
    dispatch(addressStart());
    try {
        await axios.delete(`/api/shop/address/delete/${userId}/${addressId}`);
        dispatch(fetchAddresses( userId ));
    } catch (error) {
        console.error('Error deleting address:', error);
        dispatch(addressFail(error.message));
    }
}