import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { BiArrowBack, BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import QuantityDropdown from "../components/QuantityDropdown";
import { addToCart } from "../utils/cart";
import { useStore } from "../stores/store";
import PurchaseForm from "../components/PurchaseForm";
import { toast } from "react-toastify";

interface Product {
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: string[];
  warrantyInformation: string;
  stock: number;
  shippingInformation: string;
  brand: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
}

const ProductPage: React.FC = () => {
  const { openPurchaseForm, purchaseFormContext } = useStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cartPageQuantity, setCartPageQuantity } = useStore();

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product data: ", error);
        });
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="pt-15 p-2 dark:bg-[#201E1E] dark:text-white">
        {" "}
        <BiArrowBack
          className="hidden sm:block absolute top-14 left-1 h-8 w-8 rounded-full bg-gray-100 dark:text-black cursor-pointer hover:bg-gray-200"
          onClick={() => navigate(-1)}
        />
        <img
          src={product.images[0]}
          alt=""
          className="block object-cover h-80 w-80"
        />
        <h1 className="text-xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-2 text-sm">
          {product.rating.toFixed(1)} <Rating rating={product.rating} />
        </div>
        <p className="text-xl font-semibold">$ {product.price}</p>
        <div className="mt-10 space-y-10">
          <div className="bg-gray-200 p-2 dark:text-black">
            <p>
              <strong>Brand: </strong> {product.brand}
            </p>
            <p>
              <strong>Weight: </strong> {product.weight}
            </p>
            <p>
              <strong>dimensions: </strong>
              <p>
                <strong>Width: </strong>
                {product.dimensions.width}mm
              </p>
              <p>
                <strong>Height: </strong>
                {product.dimensions.height}mm
              </p>
              <p>
                <strong>Depth: </strong>
                {product.dimensions.depth}mm
              </p>
            </p>
          </div>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <div className="border p-2 space-y-2">
            <div className="space-y-2">
              <p className="text-lg font-bold text-green-700">
                In Stock: {product.stock}
              </p>
              <QuantityDropdown price={product.price} />
              <button
                className="w-full text-black bg-amber-400 py-1 rounded-lg active:bg-amber-300 cursor-pointer"
                onClick={() => {
                  addToCart(product, cartPageQuantity), setCartPageQuantity(1);
                  toast.success(`${product.title} is added to the cart`);
                }}>
                Add to cart
              </button>
              <button
                className="w-full text-white bg-black py-1 rounded-lg cursor-pointer"
                onClick={() => openPurchaseForm("Product")}>
                Buy Now
              </button>
              <p>
                <strong>ReturnPolicy:</strong> {product.returnPolicy}
              </p>

              <p>
                <strong>ReturnPolicy:</strong> {product.returnPolicy}
              </p>
              <p>
                <strong>WarrantyInformation:</strong>{" "}
                {product.warrantyInformation}
              </p>
              <p>
                <strong>ShippingInformationr:</strong>{" "}
                {product.shippingInformation}
              </p>
            </div>
            <details className="group">
              <summary
                className="list-none cursor-pointer flex items-center text-blue-600 "
                onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  {isOpen ? (
                    <>
                      <span>Hide reviews</span>
                      <BiUpArrowAlt className="mt-1" />
                    </>
                  ) : (
                    <>
                      <span>See reviews</span>
                      <BiDownArrowAlt className="mt-1" />
                    </>
                  )}
                </div>
              </summary>
              {product.reviews.map((review: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:text-black p-1 rounded-md my-2 ">
                  <p className="flex justify-between items-center">
                    <strong>User {index}</strong>
                    <Rating rating={review.rating} />
                  </p>

                  <p>{review.comment}</p>
                </div>
              ))}
            </details>
          </div>
        </div>
      </div>
      {purchaseFormContext === "Product" && <PurchaseForm />}
    </>
  );
};

export default ProductPage;
