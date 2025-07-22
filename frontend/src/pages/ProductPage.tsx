/*
{ id: 1, title: "Essence Mascara Lash Princess", description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.", … }
​​
availabilityStatus: "In Stock"
​​
brand: "Essence"
​​
category: "beauty"
​​
description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula."
​​
dimensions: Object { width: 15.14, height: 13.08, depth: 22.99 }
​​
discountPercentage: 10.48
​​
id: 1
​​
images: Array [ "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp" ]
​​
meta: Object { createdAt: "2025-04-30T09:41:02.053Z", updatedAt: "2025-04-30T09:41:02.053Z", barcode: "5784719087687", … }
​​
minimumOrderQuantity: 48
​​
price: 9.99
​​
rating: 2.56
​​
returnPolicy: "No return policy"
​​
reviews: Array(3) [ {…}, {…}, {…} ]
​​
shippingInformation: "Ships in 3-5 business days"
​​
sku: "BEA-ESS-ESS-001"
​​
stock: 99
​​
tags: Array [ "beauty", "mascara" ]
​​
thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
​​
title: "Essence Mascara Lash Princess"
​​
warrantyInformation: "1 week warranty"
​​
weight: 4
​​
<prototype>: Object { … }
*/

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { BiArrowBack, BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import QuantityDropdown from "../components/QuantityDropdown";
import {
  IoArrowBackCircleOutline,
  IoChevronBackCircleOutline,
} from "react-icons/io5";
import { addToCart } from "../utils/cart";
import { useStore } from "../stores/store";
import PurchaseForm from "../components/PurchaseForm";

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
      <div className="mt-15 p-2 ">
        {" "}
        <BiArrowBack
          className="hidden sm:block absolute top-15 left-1 h-10 w-10 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200"
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
          <div className="bg-gray-200 p-2">
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
                className="w-full text-black bg-amber-400 py-1 rounded-lg"
                onClick={() => {
                  addToCart(product, cartPageQuantity), setCartPageQuantity(1);
                }}>
                Add to cart
              </button>
              <button
                className="w-full text-white bg-black py-1 rounded-lg"
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
                className="list-none cursor-pointer flex items-center text-blue-600"
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
                <div key={index} className="bg-gray-100 p-1 rounded-md my-2">
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
