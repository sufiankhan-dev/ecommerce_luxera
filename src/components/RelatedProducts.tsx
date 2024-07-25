import React from "react";
import Link from "next/link";
import { simplifiedProduct } from "../../type";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const RelatedProducts = ({ products }: any) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-2 md:px-8 py-3 sm:py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 uppercase">
            Recommended Products
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => {
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
                      <h3 className="text-sm text-gray-700 uppercase max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
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

export default RelatedProducts;
