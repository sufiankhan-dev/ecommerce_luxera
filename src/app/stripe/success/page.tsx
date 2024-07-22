import { BadgeCheck, CheckCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <BadgeCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center capitalize">
            Payment successfully done!
          </h3>
          <p className="text-gray-600 mt-2 capitalize">
            Thanks for shopping We hope you enjoy it
          </p>
        </div>
        <Link
          className="flex items-center justify-center mt-10 font-medium hover:underline  text-primary hover:text-primary/80 uppercase"
          href={"/"}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default page;
