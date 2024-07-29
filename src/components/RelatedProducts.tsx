import React from "react";
import Link from "next/link";
import Image from "next/image";

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
                  <div className="aspect-square w-full overflow-hidden bg-newgray group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.imageUrl}
                      alt="Product Image"
                      className="object-contain w-full h-full object-center lg:h-full lg:w-full"
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

export default RelatedProducts;
