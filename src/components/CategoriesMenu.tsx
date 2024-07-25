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
import { ArrowRight } from "lucide-react";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div
          className="hover:scale-105 transform transition-transform duration-200 cursor-pointer"
          onClick={() => setIsSheetOpen(true)}
        >
          <HiOutlineMenuAlt2 className="h-8 w-8 md:h-10" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="sm:max-w-md w-[90vw] pl-10">
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-4xl text-gray-900 font-extrabold italic -mt-2">
            <Link href={"/"} className="cursor-pointer" onClick={closeSheet}>
              Luxera
            </Link>
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
              <Link
                href={"/category/men"}
                className="flex flex-row gap-x-2 hover:font-semibold"
                onClick={closeSheet}
              >
                <span>View All</span>
                <ArrowRight />
              </Link>
              {MensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link
                    href={`/collection/men/${collection.collectionSlug}`}
                    onClick={closeSheet}
                  >
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="capitalize text-lg">
              <Link
                href={"/category/women"}
                className="flex flex-row gap-x-2 hover:font-semibold"
                onClick={closeSheet}
              >
                <span>View All</span>
                <ArrowRight />
              </Link>
              {WomensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link
                    href={`/collection/women/${collection.collectionSlug}`}
                    onClick={closeSheet}
                  >
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
