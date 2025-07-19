import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { FaCartPlus } from "react-icons/fa";
import type React from "react";
import { addToCart } from "../utils/cart";

interface ProductCardProps {
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
  images: string[];
  id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  rating,
  price,
  discountPercentage,
  images,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col border p-2 gap-0.5 rounded-md w-[138px]">
      <div
        onClick={() => {
          console.log(id);
          navigate(`/product/${id}`);
        }}
        className="cursor-pointer">
        <img
          className="block object-cover w-30 h-30 rounded-md"
          src={images[0]}
          alt={title}
        />
        <h1 className="font-semibold truncate">{title}</h1>
      </div>
      <div className="flex items-center justify-between text-sm ">
        <Rating rating={rating} /> ({rating})
      </div>
      <div className="flex justify-between">
        <p className="text-sm">
          <span className="line-through text-gray-500">{price}$</span>{" "}
          <span className="text-black">
            {(price - (price * discountPercentage) / 100).toFixed(2)}$
          </span>
        </p>
        <FaCartPlus
          className="h-4 w-4 cursor-pointer"
          onClick={() => {
            console.log(title, "Added to cart");
            addToCart({ images, title, price });
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
