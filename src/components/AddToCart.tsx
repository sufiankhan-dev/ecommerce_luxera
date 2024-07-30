"use client";

import React from "react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlForImage } from "../../sanity/lib/image";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlForImage(image),
    price_id: price_id,
  };
  return (
    <Button
      className="w-full bg-black rounded-none uppercase font-normal hover:bg-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      onClick={() => {
        addItem(product), handleCartClick();
      }}
    >
      Add to cart
    </Button>
  );
};

export default AddToCart;
