import React from "react";
import { client } from "../../sanity/lib/client";
import { simplifiedProduct } from "../../type";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc){
  _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": image[0].asset->url,
    salePercent
}`;

  const data = await client.fetch(query);

  return data;
}

const Newest = async () => {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto mx-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:mx-w-7xl lg:px-32">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-gray-900">
            Our Latest Collection
          </h2>

          <Link
            className="text-primary flex items-center gap-x-1"
            href={"/all"}
          >
            All Products{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

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
                    />
                  </div>

                  <div className="mt-4 flex-col justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 uppercase max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.name}
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName}
                    </p> */}
                    </div>
                    <div>
                      {/* <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p> */}
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

export default Newest;
