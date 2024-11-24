/* eslint-disable @next/next/no-img-element */
"use client";
import { RootState } from "@/app/redux/store"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Product } from "@/app/models/productsModel"; // Import your Product model

export default function ProductPage() {
  const { id } = useParams<{ id: string }>(); // Type for useParams to ensure correct `id` type

  // Convert the URL `id` (string) to a number
  const productId = Number(id); // Use parseInt to convert the string to a number

  // Get the products from Redux store
  const products = useSelector((state: RootState) => state.products.items);

  // Find the product by ID from the list
  const product = products.find((item: Product) => item.id == productId);
    
  // If the product is not found, return an error message
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.brand}</p>
      <p className="text-lg font-semibold text-gray-800">
        Price: ${product.price}
      </p>
      <img
        src={product.image}
        alt={product.name}
        className="mt-6 w-full max-w-md rounded shadow"
      />
    </div>
  );
}
