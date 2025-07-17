import { BsStar, BsStarFill, BsStars } from "react-icons/bs";
import { RiAtLine } from "react-icons/ri";
import img from "../assets/Gold_Star.svg.png";

const Rating = (rating: { rating: number }) => {
  const width = rating.rating * 20;
  return (
    <>
      <div className="relative w-[70px] h-3.5">
        <div
          style={{
            width: `${width}%`,
            maskImage: 'url("/mask-shape.svg")',
            WebkitMaskImage: `url(${img})`,
            maskSize: "14px 14px",
            WebkitMaskSize: "14px 14px",
            maskRepeat: "repeat-x",
            WebkitMaskRepeat: "repeat-x",
            maskPosition: "left center",
            WebkitMaskPosition: "left center",
          }}
          className="absolute h-full bg-amber-400"></div>
        <div className="absolute flex w-[70px]">
          <BsStar className="w-[14px]" />
          <BsStar className="w-[14px]" />
          <BsStar className="w-[14px]" />
          <BsStar className="w-[14px]" />
          <BsStar className="w-[14px]" />
        </div>

        {/* <svg width="200" height="200" viewBox="0 0 100 100">
          <path
            d="
        M50,5 
        L61,35 L95,35 
        L67,57 L76,91 
        L50,72 L24,91 
        L33,57 L5,35 
        L39,35

        L39,5   <!-- Top-right corner of square -->
        L5,5    <!-- Top-left -->
        L5,95   <!-- Bottom-left -->
        L95,95  <!-- Bottom-right -->
        L95,5   <!-- Top-right again -->
        L61,35  <!-- Link back to star just to close the path nicely -->
        Z

        M50,20 
        L58,40 L80,40 
        L62,55 L68,78 
        L50,65 L32,78 
        L38,55 L20,40 
        L42,40 Z
      "
            fill="black"
            fillRule="evenodd"
            stroke="black"
            strokeWidth="0.5"
          />
        </svg> */}
      </div>
    </>
  );
};

export default Rating;
