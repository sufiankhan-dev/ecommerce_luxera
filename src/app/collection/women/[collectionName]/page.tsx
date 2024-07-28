import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CollectionsData } from "../../../../../type";
import { client } from "../../../../../sanity/lib/client";

async function getData(collectionName: string) {
  const query = `*[_type == 'product' && category->name == "women" && collectionSlug == "${collectionName}"]{
  _id,
    "imageUrl": image[0].asset->url,
      price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
  "collectionName": collection->collectionName,
   "collectionSlug": collectionSlug,
   salePercent,
   colors
}`;

  const data = await client.fetch(query);

  return data;
}

const WomensCollection = async ({
  params,
}: {
  params: { collectionName: string };
}) => {
  const data: CollectionsData[] = await getData(params.collectionName);
  return (
    <div className="bg-white">
      <div className="mx-auto mx-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:mx-w-7xl lg:px-32">
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => {
            const discountedPrice = product.salePercent
              ? (
                  product.price -
                  (product.price * product.salePercent) / 100
                ).toFixed(2)
              : null;
            return (
              <div key={product._id} className="group relative">
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.imageUrl}
                      alt="Product Image"
                      className="object-cover w-full h-full object-center lg:h-full lg:w-full"
                      width={300}
                      height={300}
                      priority
                      quality={100}
                    />
                  </div>

                  <div className="mt-4 flex-col justify-between">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-sm text-gray-700 uppercase max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.name}
                      </h3>
                      {product.colors && (
                        <div className="flex gap-x-8 items-center">
                          <div className="flex gap-x-1">
                            {product.colors.map((color: any, index: any) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-black cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={color} // Display hex code as a tooltip
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">
                        {product.salePercent ? (
                          <div className="flex flex-row gap-x-3">
                            <span className="line-through text-gray-500">
                              ${product.price.toFixed(2)}
                            </span>{" "}
                            <div className="bg-yellow-300 flex flex-row px-2 gap-x-3">
                              <span className="text-black">
                                ${discountedPrice}
                              </span>
                              {product.salePercent && (
                                <p className="text-black">
                                  -{product.salePercent}%
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WomensCollection;
