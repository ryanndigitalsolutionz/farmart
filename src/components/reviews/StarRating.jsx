import { useState } from 'react'
import { FaStar } from "react-icons/fa"

function StarRating({ value = 0, onchange, size = 22 }) {
    const [hovered, setHovered] = useState(0);
    const interactive = typeof onchange === "function";

  return (
    <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= (hovered || value);

            return (
                <FaStar 
                    key={star}
                    size={size}
                    color={filled ? "gold" : "#d1d5db"}
                    onClick={interactive ? "cursor-pointer" : ""}
                    onMouseEnter={
                        interactive ? () => setHovered(star) : undefined
                    }
                    onMouseLeave={interactive ? () => setHovered(0) : undefined}

                />
            );
        })}

    </div>
  )
}

export default StarRating;