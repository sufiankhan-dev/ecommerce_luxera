import React from "react";
import { client } from "../../../../sanity/lib/client";
import { fullProductData } from "../../../../type";
import ImageCarousel from "../../../components/ImageCarousel";
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
    collectionSlug,
    price_id,
    sizes,
    colors,
    salePercent,
    fit
}`;
  const data = await client.fetch(query);

  return data;
}

async function getRelatedProducts(
  categoryName: string,
  currentSlug: string,
  collectionSlug: string
) {
  const query = `*[_type == 'product' && category->name == "${categoryName}" && slug.current != "${currentSlug}" && collectionSlug == "${collectionSlug}"]{
    _id,
    name,
    price,
    "imageUrl": image[0].asset->url,
    "slug": slug.current,
    collectionSlug,
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
    data.slug,
    data.collectionSlug
  );
  const discountedPrice = data.salePercent
    ? (data.price - (data.price * data.salePercent) / 100).toFixed(2)
    : null;

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageCarousel image={data.image} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3 flex gap-y-2 flex-col">
              <h2 className="text-2xl font-bold leading-relaxed text-gray-900 dark:text-white lg:text-xl uppercase">
                {data.name}
              </h2>
              <p className="text-gray-800 dark:text-gray-300 uppercase text-xs">
                L1001/{data._id}
              </p>
              {/* Price of product */}
              <div className="flex flex-row items-baseline gap-x-2">
                {data.salePercent ? (
                  <div className="flex flex-row gap-x-3">
                    <span className="text-lg font-bold text-black dark:text-gray-100 md:text-lg flex flex-row gap-x-6 items-center">
                      <span className="font-bold uppercase">Price:</span>
                      <span className="line-through text-gray-700 dark:text-gray-400">
                        ${data.price.toFixed(2)}
                      </span>
                    </span>{" "}
                    <div className="bg-yellow-300 dark:bg-yellow-600 flex flex-row px-2 gap-x-3">
                      <span className="text-lg font-medium text-gray-900 dark:text-white md:text-lg">
                        ${discountedPrice}
                      </span>
                      {data.salePercent && (
                        <p className="text-lg font-medium text-gray-900 dark:text-white md:text-lg">
                          -{data.salePercent}%
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">
                    Price: ${data.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <hr className="h-[2.5px] my-5 bg-gray-600 dark:bg-gray-400" />
            <div className="flex flex-col gap-5 uppercase">
              {/* Available Colors Section */}
              {data.colors && (
                <div className="flex gap-x-8 items-center">
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    Colors
                  </span>
                  <div className="flex gap-x-2">
                    {data.colors.map((color: any, index: any) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-black dark:border-gray-300 cursor-pointer"
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
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    Size
                  </span>
                  <div className="flex gap-x-1 uppercase text-sm">
                    {data.sizes.map((size: any, index: any) => (
                      <Toggle className="h-7 w-7" key={index}>
                        <span>{size}</span>
                      </Toggle>
                    ))}
                  </div>
                </div>
              )}

              {/* Which gender it's for */}
              <div className="flex gap-x-8 items-center">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  Gender
                </span>
                <div className="flex gap-x-2 text-sm text-gray-900 dark:text-gray-100">
                  {data.categoryName}
                </div>
              </div>
            </div>

            {/* Check Buttons Etc */}
            <hr className="h-[2.5px] my-5 bg-gray-600 dark:bg-gray-400" />
            <div className="flex flex-col gap-y-3">
              <AddToCart
                currency="USD"
                description={data.description}
                image={data.image[0]}
                name={data.name}
                price={
                  discountedPrice ? parseFloat(discountedPrice) : data.price
                }
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            {/* Fit Check */}
            {data.fit && (
              <div className="flex gap-x-4 items-center uppercase pt-5">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  Fit
                </span>
                <div className="flex gap-x-2 text-sm text-gray-700 dark:text-gray-300">
                  {data.fit}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="text-sm text-gray-700 dark:text-gray-300 pt-5 leading-relaxed uppercase hidden md:block">
              <p>{data.description}</p>
            </div>

            {/* Composition and Care */}
            {data.compositionAndCare && data.compositionAndCare.length > 0 && (
              <div className="uppercase flex-col pt-5 hidden md:block">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  Composition & Care
                </span>
                <div className="pt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {data.compositionAndCare.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Link of Delivery and Return */}
            <DeliveryAndReturnDialog />

            {/* Mobile Product Data Dropdown */}
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
