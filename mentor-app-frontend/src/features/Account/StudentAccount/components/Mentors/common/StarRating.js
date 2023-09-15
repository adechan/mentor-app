import { useState, useEffect, useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";

const StarRating = ({ initialRating, stars, setStars }) => {
  const possibleStars = [0, 1, 2, 3, 4];
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setStars(initialRating);
  }, [initialRating]);

  const iconColor = useMemo((index, biggerThan) => {
   if (index <= biggerThan) {
     return 'orange'
   }

   return 'lavander'
  }, [])

  const onHover = (value) => {
    setHover(value);
  }

  const onClick = (value) => {
    setStars(value)
  }

  return (
    <>
      {possibleStars.map((_, index) => {
        return (
          <StarIcon
            style={{
              color: iconColor(index + 1, hover ? hover : stars)
            }}
            onMouseLeave={() => onHover(null)}
            onMouseEnter={() => onHover(index + 1)}
            onClick={() => onClick(index + 1)}
          />
        );
      })}
    </>
  );
};

export default StarRating;
