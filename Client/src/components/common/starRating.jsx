import React, { useState } from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating ,setRating, }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="outline"
          size="icon"
          onClick={() =>{ setRating(star);
            setHover(star)
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
         
        >
          <StarIcon
            className={`w-5 h-5 ${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarRating;
