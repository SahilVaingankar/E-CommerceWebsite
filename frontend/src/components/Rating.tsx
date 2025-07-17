import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import img from "../assets/Gold_Star.svg.png";

const Rating = (rating: { rating: any }) => {
  // for Mask method
  const width = rating.rating * 20;

  // for Traditional method
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating.rating >= i) {
      stars.push(<BsStarFill key={i} className="text-amber-400" />);
    } else if (rating.rating >= i - 0.5) {
      stars.push(<BsStarHalf key={i} className="text-amber-400" />);
    } else {
      stars.push(<BsStar key={i} className="text-amber-400" />);
    }
  }

  return (
    <>
      {/* -----------------------------------------with Mask------------------------------------------------ */}
      {/* 
      Adantages: 
      - only 2 image imports
      - less use of JS 
      - gives decimal precise fill on each
      
      Disadvantages:
      - additional background div on every card although we can remove the "BsStar" completely but it dont look good without border effect
      - the support of mask is mostly good in browsers but require "webkit" prefix for old browsers like internet explorer*/}

      {/* <div className="relative w-[70px] h-3.5">
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
      </div> */}
      {/* -----------------------------------------Traditional method------------------------------------------------ */}
      {/*  
      Adantages: 
      - less use of CSS and HTML
      
      Disadvantages:
      - required 3 image imports
      - more use of JS for conditional checking 
      - requires to maintain extra list in the memory
      - don't gives decimal precise fill on each star counts   1.4 as 1 star with corrent logic
       */}
      <div className="flex">{stars}</div>
    </>
  );
};

export default Rating;
