import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAddress } from '../../store/actions/addressAction.jsx';

const AddressCard = ({ address, onEdit, onDelete }) => {
  const user = useSelector((state) => state.user.user?.username);
  const selectedAddress = useSelector(
    (state) => state.addressList.selectedAddress
  );
  const dispatch = useDispatch();
  if (!address) return null;
  const handleAddressID = (id) => {
    
    dispatch(selectAddress(id));
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">

        <input
      type="radio"
      name="address"
      checked={selectedAddress === address}
      onChange={() => handleAddressID(address)}
      className="accent-black"
    />
      </div>
      <div className="flex justify-between items-center mb-3">

        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          Deliver to
        </span>
        <span className="text-sm font-semibold text-gray-800 uppercase">
          {user || "Guest"}
        </span>
      </div>


      <div className="text-sm text-gray-600 space-y-1">
        <p className="font-semibold text-gray-900">
          {address.address}
        </p>
        <p>
          {address.city}, {address.pincode}
        </p>
        <p>
          <span className="font-medium text-gray-700">Phone:</span> {address.phone}
        </p>
      </div>

      {/* Notes */}
      {address.notes && (
        <div className="mt-3 bg-gray-50 p-2 rounded-md">
          <p className="text-xs text-gray-500 italic">
            {address.notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-between text-xs font-medium">
        <button
          onClick={() => onEdit?.(address._id, address)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(address.userId, address._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;