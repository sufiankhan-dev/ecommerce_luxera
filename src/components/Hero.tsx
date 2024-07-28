"use client";

import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface BannerImages {
  image1: any;
  image2: any;
  image3: any;
}

const Hero = ({ image1, image2, image3 }: BannerImages) => {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto lg:px-32">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 hidden md:flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 hidden md:flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div>
          <Image
            alt="Hero Image"
            height={700}
            width={700}
            quality={100}
            src={urlForImage(image1)}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <Link href={"/category/women"}>
            <div className="px-[12px] md:px-[25px] py-[7px] md:py-[15px] font-oswald bg-white absolute bottom-[15px] md:bottom-[35px] left-0 text-black/[0.9] text-[12px] md:text-[22px] uppercase font-semibold cursor-pointer hover:opacity-90">
              Shop now
            </div>
          </Link>
        </div>

        <div>
          <Image
            alt="Hero Image"
            height={700}
            width={700}
            quality={100}
            src={urlForImage(image2)}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <Link href={"/sale"}>
            <div className="px-[12px] md:px-[25px] py-[7px] md:py-[15px] font-oswald bg-white absolute bottom-[15px] md:bottom-[35px] left-0 text-black/[0.9] text-[12px] md:text-[22px] uppercase font-semibold cursor-pointer hover:opacity-90">
              Shop now
            </div>
          </Link>
        </div>

        <div>
          <Image
            alt="Hero Image"
            height={700}
            width={700}
            quality={100}
            src={urlForImage(image3)}
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <Link href={"/category/men"}>
            <div className="px-[12px] md:px-[25px] py-[7px] md:py-[15px] font-oswald bg-white absolute bottom-[15px] md:bottom-[35px] left-0 text-black/[0.9] text-[12px] md:text-[22px] uppercase font-semibold cursor-pointer hover:opacity-90">
              Shop now
            </div>
          </Link>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
