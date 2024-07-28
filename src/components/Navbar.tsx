"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOutIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShoppingCart } from "use-shopping-cart";
import CategoriesMenu, { CategoryProps } from "./CategoriesMenu";
import { CategoriesItems } from "../../type";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Men", href: `/category/men` },
  { name: "Women", href: `/category/women` },
];

const Navbar = ({ Mensdata, Womensdata }: CategoriesItems) => {
  const { handleCartClick, cartCount } = useShoppingCart();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full flex justify-between items-center h-12 py-7 px-4 md:px-8 lg:px-32 container max-w-screen-2xl">
        <div className="flex flex-row gap-2">
          <CategoriesMenu MensData={Mensdata} WomensData={Womensdata} />
          <Link href={"/"}>
            <span className="text-2xl md:text-4xl font-extrabold italic flex items-center">
              Luxera
            </span>
          </Link>
        </div>
        <div className="cursor-pointer border-l md:border-none flex flex-row items-center gap-5">
          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:scale-110 transform transition-transform duration-200 cursor-pointer relative -mr-2"
            onClick={() => handleCartClick()}
          >
            <HiOutlineShoppingBag className="h-6 w-6" />
            {cartCount != 0 && (
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {cartCount}
              </div>
            )}
          </div>
          {/* Login button  */}
          {!session && (
            <div
              onClick={() => signIn()}
              className="relative hidden md:flex uppercase text-lg gap-x-2 rounded-md ml-3 font-medium mt-1 tracking-wide hover:text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:bg-black before:origin-center before:h-[1.5px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-500 after:absolute after:bg-black after:origin-center after:h-[1.5px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >
              <p>Login</p>
            </div>
          )}

          {/* user image  */}
          <div className="hidden md:flex">
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
      </div>
    </header>
  );
};

export default Navbar;
