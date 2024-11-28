/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import CloseIcon from "../closeIcon/CloseIcon";
import { Product } from "@/app/models/productsModel";
import { addToCart } from "../sections/products/Product.service";
import { addItemToCart } from "@/app/redux/addToCartSlice"; // Import your action here

const ProductRecommender = () => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const productsRecommender = useSelector(
    (state: RootState) => state.products.items
  );
  const dispatch = useDispatch<AppDispatch>();

  // Find all new products
  const newProducts = productsRecommender.filter((item) => item.new);

  // Fill remaining slots with other products, excluding those already selected
  const additionalProducts = productsRecommender.filter((item) => !item.new);

  // Combine new products with additional products, ensuring exactly 3 items
  const displayedProducts = [...newProducts, ...additionalProducts].slice(0, 3);

  const handleAddToCart = (item: Product) => {
    // Dispatch an action to add the item to the Redux store directly
    dispatch(addItemToCart(item));

    // Call the addToCart service if necessary (you can keep it for external operations)
    addToCart(item);
  };

  const handleImageError = (id: string) => {
    setImageError((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  return (
    <div>
      {displayedProducts.map((item) => (
        <div className="my-10 flex gap-5" key={item.id}>
          <img
            width={100}
            loading="lazy"
            src={
              imageError[item.id]
                ? "https://www.perfumerh.com/cdn/shop/files/INKRewritten50mlBottleFRONT.jpg?crop=center&height=3431&v=1729121232&width=3431"
                : item.image
            }
            alt={item.name}
            onError={() => handleImageError(`${item.id}`)}
          />
          <div className="w-full flex flex-col justify-around">
            <p className="text-brown-normal text-[14px] font-thin">
              {item.name}
            </p>
            <div className="flex justify-between mt-5">
              <p className="text-brown-normal text-[14px] font-thin">
                ${item.price}
              </p>
              <span className="rotate-45" onClick={() => handleAddToCart(item)}>
                <CloseIcon />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductRecommender;
