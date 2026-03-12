import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useSelector } from 'react-redux';

const AddressCard = ({ address, onEdit, onDelete }) => {
  const user = useSelector((state) => state.user.user?.username);
    console.log("add",address.userId)
  if (!address) return null;

  return (
    <Card className="bg-white border-none shadow-none transition-all hover:bg-gray-50/50">
      {/* Subtle background on header to separate the cards visually without borders */}
      <CardHeader className="pb-3 pt-4 px-0">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Deliver to
          </span>
          <CardTitle className="text-sm font-bold tracking-tight text-gray-900 uppercase">
            {user || "Guest"}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-0 pt-2">
        <div className="text-sm text-gray-600 leading-snug space-y-1">
          <p className="font-semibold text-gray-800">{address.address}</p>
          <p>{address.city}, {address.pincode}</p>
          <p className="pt-1 text-gray-500">
            <span className="font-medium">Phone:</span> {address.phone}
          </p>
        </div>

        {address.notes && (
          <p className="mt-3 text-xs text-gray-400 italic bg-gray-50 p-2 rounded-md">
            Note: {address.notes}
          </p>
        )}

        <div className="mt-5 flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider">
          <button
              onClick={() => onEdit?.(address._id, address)}
            className="text-blue-600 hover:text-blue-500 transition-colors"
          >
            Edit Address
          </button>
          <button
            onClick={() => onDelete?.(address.userId,address._id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;