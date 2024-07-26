import React from "react";
import { client } from "../../../../sanity/lib/client";
import { DeliveryAndReturnData, fullProductData } from "../../../../type";
import ImageCarousel from "../../../components/ImageCarousel";
import { Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryAndReturnDialog from "@/components/DeliveryAndReturnDailog";
import AddToCart from "@/components/AddToCart";
import RelatedProducts from "@/components/RelatedProducts";
import { Toggle } from "@/components/ui/toggle";
import DescriptionDropdown from "@/components/DescriptionDropdown";

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0]{
  _id,
    image,
    price,
    name,
    description,
    compositionAndCare,
    "slug": slug.current,
    "categoryName": category->name,
    price_id,
    sizes,
    colors,
    salePercent,
    fit
}`;
  const data = await client.fetch(query);

  return data;
}

async function getRelatedProducts(categoryName: string, currentSlug: string) {
  const query = `*[_type == 'product' && category->name == "${categoryName}" && slug.current != "${currentSlug}"]{
    _id,
    name,
    price,
    "imageUrl": image[0].asset->url,
    "slug": slug.current,
    salePercent,
    colors
  }`;
  const relatedProducts = await client.fetch(query);
  return relatedProducts;
}

const page = async ({ params }: { params: { slug: string } }) => {
  const data: fullProductData = await getData(params.slug);
  const relatedProducts = await getRelatedProducts(
    data.categoryName,
    data.slug
  );
  const discountedPrice = data.salePercent
    ? (data.price - (data.price * data.salePercent) / 100).toFixed(2)
    : null;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageCarousel image={data.image} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3 flex gap-y-2 flex-col">
              {/* <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span> */}
              <h2 className="text-2xl font-bold leading-relaxed text-gray-900 lg:text-xl uppercase">
                {data.name}
              </h2>
              <p className="text-gray-800 uppercase text-xs">
                L1001/{data._id}
              </p>
              {/* price of product  */}
              {/* <div className="flex flex-row items-baseline gap-x-2">
                <span className="text-xl font-bold text-gray-900 md:text-lg">
                  Price: ${data.price}
                </span>
                <span className="text-[14px] text-gray-600 line-through">
                  ${data.price + 10}
                </span>
              </div> */}
              <div className="flex flex-row items-baseline gap-x-2">
                {data.salePercent ? (
                  <div className="flex flex-row gap-x-3">
                    <span className="text-lg font-bold text-black md:text-lg flex flex-row gap-x-6 items-center">
                      <span className="font-bold uppercase">Price:</span>
                      <span className="line-through text-gray-700">
                        ${data.price.toFixed(2)}
                      </span>
                    </span>{" "}
                    <div className="bg-yellow-300 flex flex-row px-2 gap-x-3">
                      <span className="text-lg font-medium text-gray-900 md:text-lg">
                        ${discountedPrice}
                      </span>
                      {data.salePercent && (
                        <p className="text-lg font-medium text-gray-900 md:text-lg">
                          -{data.salePercent}%
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span>Price: ${data.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            <hr className="h-[2.5px] my-5 bg-gray-600" />
            <div className="flex flex-col gap-5 uppercase">
              {/* Available Colors Section */}
              {data.colors && (
                <div className="flex gap-x-8 items-center">
                  <span className="font-bold text-sm">Colors</span>
                  <div className="flex gap-x-2">
                    {data.colors.map((color: any, index: any) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-black cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color} // Display hex code as a tooltip
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Available Sizes Section */}
              {data.sizes && (
                <div className="flex gap-x-[50px] items-center">
                  <span className="font-bold text-sm">Size</span>
                  <div className="flex gap-x-1 uppercase text-sm">
                    {data.sizes.map((size: any, index: any) => (
                      <Toggle className="h-7 w-7" key={index}>
                        <span key={index}>{size}</span>
                      </Toggle>
                    ))}
                  </div>
                </div>
              )}

              {/* Which gender it's for  */}
              <div className="flex gap-x-8 items-center">
                <span className="font-bold text-sm">Gender</span>
                <div className="flex gap-x-2 text-sm">{data.categoryName}</div>
              </div>
            </div>

            {/* Check Buttons Etc  */}

            <hr className="h-[2.5px] my-5 bg-gray-600" />
            <div className="flex flex-col gap-y-3">
              <AddToCart
                currency="USD"
                description={data.description}
                image={data.image[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            {/* Fit check  */}
            {data.fit && (
              <div className="flex gap-x-4 items-center uppercase pt-5">
                <span className="font-bold text-sm">Fit</span>
                <div className="flex gap-x-2 text-sm text-gray-700">
                  {data.fit}
                </div>
              </div>
            )}

            {/* description  */}
            <div className="text-sm text-gray-700 pt-5 leading-relaxed uppercase hidden md:block">
              <p>{data.description}</p>
            </div>

            {/* Composition and Care  */}
            {data.compositionAndCare && data.compositionAndCare.length > 0 && (
              <div className="uppercase flex-col pt-5 hidden md:block">
                <span className="font-bold text-sm">Composition & Care</span>
                <div className="pt-4 text-gray-700 leading-relaxed text-sm">
                  {data.compositionAndCare.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Link of delivery and return  */}
            <DeliveryAndReturnDialog />

            {/* mobile product data dropdown  */}
            <DescriptionDropdown
              description={data.description}
              compositionAndCare={data.compositionAndCare}
            />
          </div>
        </div>
        <div className="mt-10">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default page;
