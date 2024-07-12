"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="mb-8">
      <div className="w-full flex justify-between items-center h-11 px-4 md:px-20 lg:px-32 border-b container max-w-screen-2xl">
        <div className="flex flex-row gap-1">
          <Link href={"/"}>
            <Image src={"/logo.png"} height={35} width={35} alt="logo" />
          </Link>
          <span className="text-xl font-semibold lg:hidden flex items-center">
            Luxera
          </span>
        </div>
        <div className="hidden gap-8 md:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="relative text-sm font-semibold text-primary hover:text-primary cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-500 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  className="relative text-sm font-semibold text-gray-500 hover:text-primary cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-500 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-500 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                  href={link.href}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="cursor-pointer border-x md:border-none -mr-2">
          <Button variant={"ghost"}>
            <MdOutlineShoppingCart className="h-6 w-6" />
          </Button>
        </div>
        {/* <div className="text-sm flex gap-2">
          <Link href={"/"}>Women</Link>
          <Link href={"/"}>Men</Link>
          <Link href={"/"}>Workspace</Link>
          <Link href={"/"}>Productivity</Link>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
