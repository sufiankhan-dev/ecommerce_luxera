import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import Image from "next/image";

const Helplinks = [
  { name: "FAQ's", href: "" },
  { name: "Log in/sign up", href: "" },
  { name: "how to buy", href: `` },
  { name: "payment", href: `` },
  { name: "shipping and deliveries", href: `` },
  { name: "exchange & return", href: `` },
];

const Aboutlinks = [
  { name: "about us", href: "" },
  { name: "retail stores", href: "" },
  { name: "contact us", href: `` },
  { name: "work with us", href: `` },
];

const Bottomlinks = [
  { name: "faq's", href: "" },
  { name: "terms and conditions", href: "" },
  { name: "privacy policy", href: `` },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0 mb-8">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="tracking-widest uppercase text-sm">
              Can we help you?
            </div>
            <div className="tracking-widest uppercase text-[12px] flex gap-x-24  md:gap-0 flex-col leading-relaxed">
              <span>Send Email</span>
              <span className="cursor-pointer">Contactus@luxera.com.pk</span>
            </div>
            <div className="tracking-widest uppercase text-[12px] flex flex-col gap-x-[38px] md:gap-0 leading-relaxed pt-4">
              <span className="cursor-pointer">UAN: 042 111-12-6423</span>
              <span>MON-FRI 9:00 to 5:30 PSt</span>
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="hidden md:flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col">
              <div className="uppercase text-sm pb-2 tracking-widest">help</div>
              {Helplinks.map((items, index) => (
                <div key={index}>
                  <Link
                    href={items.href}
                    className="text-[12px] tracking-widest uppercase hover:text-gray-400"
                  >
                    {items.name}
                  </Link>
                </div>
              ))}
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="hidden lg:flex flex-col">
              <div className="tracking-widest uppercase text-sm pb-2">
                About luxera
              </div>
              {Aboutlinks.map((items, index) => (
                <div key={index}>
                  <Link
                    href={items.href}
                    className="text-[12px] tracking-widest uppercase hover:text-gray-400"
                  >
                    {items.name}
                  </Link>
                </div>
              ))}
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-center md:justify-start">
            <Link
              href={"https://facebook.com"}
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href={"https://youtube.com"}
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaYoutube size={20} />
            </Link>
            <Link
              href={"https://instagram.com"}
              className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
            >
              <FaInstagram size={20} />
            </Link>
          </div>
          <div className="pt-4">
            <p className="text-sm uppercase tracking-widest">Payment methods</p>
            <div className="flex flex-row gap-x-5">
              <Image
                src={"/visa.webp"}
                alt="payment options logo"
                width={60}
                height={60}
              />
              <Image
                src={"/master.webp"}
                alt="payment options logo"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <hr />
      <Wrapper className="flex items-center justify-between mt-4 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-white text-center md:text-left uppercase">
          © 2024 <Link href={"/"}>Luxera</Link>, Inc. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          {Bottomlinks.map((items, index) => (
            <div key={index}>
              <Link
                href={items.href}
                className="text-[12px] tracking-widest uppercase hover:text-gray-400"
              >
                {items.name}
              </Link>
            </div>
          ))}
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
