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
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

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
    <div className="mt-15 p-10">
      <img src={product.images[0]} alt="" />
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>ReturnPolicy:</strong> {product.returnPolicy}
      </p>
      {product.reviews.map((review: any, index: number) => (
        <div key={index}>
          <p>
            <strong>Reviewer:</strong> User {index}
          </p>
          <p>
            <strong>Comment:</strong> {review.comment}
          </p>
          <p>
            <strong>Rating:</strong> {review.rating}
          </p>
        </div>
      ))}
      <p>
        <strong>WarrantyInformation:</strong> {product.warrantyInformation}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>ShippingInformationr:</strong> {product.shippingInformation}
      </p>
    </div>
  );
};

export default ProductPage;
