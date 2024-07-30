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
import { useEffect, useState } from "react";
import { ArrowRight, LogOutIcon, TruckIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
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
            <Link
              href={"/"}
              className="cursor-pointer dark:text-white"
              onClick={closeSheet}
            >
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
        <div className="flex flex-row gap-x-2 pt-6 font-bold uppercase cursor-pointer">
          <p>Track you order</p>
          <TruckIcon />
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <p className="uppercase font-bold">Dark Mode</p>
          <Switch
            checked={isDarkMode}
            onCheckedChange={handleThemeSwitch}
            onClick={closeSheet}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex md:hidden justify-between p-4 items-center">
          <Link
            href={"/"}
            className="px-4 py-2 font-medium uppercase cursor-pointer"
          >
            Home
          </Link>
          {!session && (
            <div
              onClick={() => signIn()}
              className="uppercase font-medium right-0 absolute px-4 py-2 cursor-pointer"
            >
              <p>Login</p>
            </div>
          )}

          {/* user image  */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {session && (
                  <Image
                    src={session?.user?.image as string}
                    alt="user Image"
                    width={35}
                    height={35}
                    className="rounded-full object-cover border-none hover:scale-105 duration-200"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex gap-x-2 items-center">
                  <User className="h-5 w-6" />
                  <span className="text-[15px] font-medium">
                    {session?.user?.name}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-x-2 items-center"
                  onClick={() => signOut()}
                >
                  <LogOutIcon className="h-5 w-6" />
                  <span className="text-[15px] font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
