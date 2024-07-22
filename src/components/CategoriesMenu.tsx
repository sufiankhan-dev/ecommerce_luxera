"use client";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

export interface CategoryProps {
  MensData: Array<{ collectionName: string; collectionSlug: string }>;
  WomensData: Array<{ collectionName: string; collectionSlug: string }>;
}

export default function CategoriesMenu({
  MensData,
  WomensData,
}: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<"men" | "women">(
    "men"
  );
  // console.log(MensData);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="hover:scale-105 transform transition-transform duration-200">
          <HiOutlineMenuAlt2 className="h-8 w-8 md:h-10" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="sm:max-w-md w-[90vw] pl-10">
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-4xl text-gray-900 font-extrabold italic -mt-2">
            Luxera
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-row gap-x-4 py-4 text-base font-normal uppercase cursor-pointer">
          <div>
            <div onClick={() => setSelectedCategory("men")}>
              <span
                className={selectedCategory === "men" ? "font-extrabold" : ""}
              >
                Men
              </span>
            </div>
          </div>
          <div>
            <div onClick={() => setSelectedCategory("women")}>
              <span
                className={selectedCategory === "women" ? "font-extrabold" : ""}
              >
                Women
              </span>
            </div>
          </div>
        </div>
        <div className="pt-3">
          {selectedCategory === "men" ? (
            <ul className="capitalize text-lg">
              {MensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link href={`/collection/${collection.collectionSlug}`}>
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="capitalize text-lg">
              {WomensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link href={`/collection/${collection.collectionSlug}`}>
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
