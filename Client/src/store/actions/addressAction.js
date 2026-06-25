
import axios from '../../api/api.jsx';
import endpoints from '../../api/endpoints.js';
import { addressStart, loadAddresses, addressFail,setSelectedAddress } from '../reducers/addressSlice';
import getErrorMessage from './getErrorMessage.js';


export const createAddress = (addressData) => async (dispatch) => {
    dispatch(addressStart());
    try {
        const { data } = await axios.post(endpoints.shop.address.add, addressData);
        await dispatch(fetchAddresses(addressData.userId));
        return data.data.address;

    } catch (error) {
        const message = getErrorMessage(error, 'Error creating address');
        dispatch(addressFail(message));
        throw error;
    }
};

export const selectAddress = (addressId) => (dispatch) => {
    dispatch(addressStart());
    dispatch(setSelectedAddress(addressId));
    return addressId;
};

export const fetchAddresses = (userId) => async (dispatch) => {
    dispatch(addressStart());
    try {
        const res = await axios.get(endpoints.shop.address.all(userId));
        
        const addresses = res.data.data.addresses;
        dispatch(loadAddresses(addresses));
        return addresses;
        
    }catch(error){
        const message = getErrorMessage(error, 'Error fetching addresses');
        dispatch(addressFail(message));
        throw error;
    }
}

export const updateAddress = (userId, addressId, addressData) => async (dispatch) => {
    dispatch(addressStart());
    try {
      
         const { data } = await axios.put(endpoints.shop.address.edit(userId, addressId), addressData);

        
        await dispatch(fetchAddresses(userId));
        return data.data.address;
    } catch (error) {
        const message = getErrorMessage(error, 'Error updating address');
        dispatch(addressFail(message));
        throw error;
    }
};

export const deleteAddress = ( userId, addressId ) => async (dispatch) => {
    dispatch(addressStart());
    try {
        const { data } = await axios.delete(endpoints.shop.address.delete(userId, addressId));
        await dispatch(fetchAddresses( userId ));
        return data.data;
    } catch (error) {
        const message = getErrorMessage(error, 'Error deleting address');
        dispatch(addressFail(message));
        throw error;
    }
}
