"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { BiErrorCircle } from "react-icons/bi";

const ShoppingCart = () => {
  const { data: session } = useSession();
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
    incrementItem,
    decrementItem,
    clearCart,
  } = useShoppingCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    if (!session) {
      setErrorMessage("To Checkout!");
      return;
    }
    setErrorMessage("");
    setIsCheckingOut(true);
    try {
      console.log("Cart before checkout:", cartDetails); // Log cart details before checkout
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("Checkout error:", result.error);
      } else {
        console.log("Checkout successful, clearing cart");
        clearCart();
        console.log("Cart after clearing:", cartDetails); // Log cart details after clearing
      }
    } catch (error) {
      console.log("Checkout exception:", error);
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle className="uppercase">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between -mx-6">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={"/empty-cart.jpg"}
                    alt="Empty cart Image"
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 px-4 md:px-7">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="product image"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className="line-clamp-1 sm:line-clamp-2">
                              {entry.name}
                            </h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-row items-center gap-x-1">
                            <span
                              onClick={() => decrementItem(entry.id)}
                              className="cursor-pointer"
                            >
                              <MinusIcon className="w-5 h-5" />
                            </span>
                            <p className="text-gray-500">
                              QTY: {entry.quantity}
                            </p>
                            <span
                              onClick={() => incrementItem(entry.id)}
                              className="cursor-pointer"
                            >
                              <PlusIcon className="w-5 h-5" />
                            </span>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium flex items-center gap-1 text-primary hover:text-red-600"
                              onClick={() => removeItem(entry.id)}
                            >
                              <Trash2 className="h-4 w-5" />
                              <span className="hidden sm:flex">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between items-center text-base font-medium text-gray-900">
              <p className="uppercase font-medium">Subtotal:</p>
              <span>${totalPrice}</span>
            </div>
            <p className=" text-sm text-gray-500 font-light">
              Shipping and taxes will be calculated at checkout.
            </p>
            {errorMessage && (
              <p className="text-sm text-red-500 font-light mt-6 flex flex-row items-center">
                <span
                  onClick={() => signIn()}
                  className="underline cursor-pointer pr-1"
                >
                  <span className="flex flex-row gap-x-2 items-center">
                    <BiErrorCircle />
                    Login
                  </span>
                </span>
                {errorMessage}
              </p>
            )}
            <div className="mt-1">
              <Button
                onClick={handleCheckoutClick}
                className="w-full bg-black rounded-none uppercase"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <Image
                    src="/spinner.svg"
                    alt="Loading"
                    width={20}
                    height={20}
                  />
                ) : (
                  "checkout"
                )}
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              OR{" "}
              <button
                className="pl-2 font-medium text-primary hover:text-primary/80 uppercase"
                onClick={() => handleCartClick()}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
