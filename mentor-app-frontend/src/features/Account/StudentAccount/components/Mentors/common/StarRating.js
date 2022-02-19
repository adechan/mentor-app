import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";

const StarRating = ({ initialRating, stars, setStars }) => {
  const possibleStars = [0, 1, 2, 3, 4];
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setStars(initialRating);
  }, [initialRating]);

  return (
    <>
      {possibleStars.map((_, index) => {
        return (
          <StarIcon
            style={{
              color:
                index + 1 <= (hover ? hover : stars) ? "orange" : "lavender",
            }}
            onMouseLeave={() => setHover(null)}
            onMouseEnter={() => setHover(index + 1)}
            onClick={() => setStars(index + 1)}
          />
        );
      })}
    </>
  );
};

export default StarRating;
