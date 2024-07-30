import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const DeliveryAndReturnDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="font-bold text-sm pt-4 uppercase hidden md:block">
          Deliveries & Returns
        </DialogTrigger>
        <DialogContent className="w-xl dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold uppercase flex tracking-wide items-center justify-center dark:text-gray-300">
              Deliveries & Returns
            </DialogTitle>
            <hr className="h-[1px] my-5 bg-gray-600 dark:bg-gray-500" />
            <DialogDescription className="text-gray-700 dark:text-gray-400">
              <span className="font-bold text-sm text-black dark:text-white uppercase tracking-wide">
                Deliveries:
              </span>
              <div className="mt-1 leading-relaxed tracking-wide mb-4">
                <p>
                  FLAT Shipping 219 PKR + FBR POS Fee 1 PKR will be charged on
                  order within Pakistan.
                </p>
                <p>
                  All orders may take up to 5-7 working days in regular days and
                  during sales it will be delivered in 7-10 working days.
                </p>
              </div>
              <span className="font-bold text-sm text-black dark:text-white uppercase tracking-wide">
                Returns:
              </span>
              <div className="mt-1 leading-relaxed tracking-wide">
                <p>
                  All products purchased from{" "}
                  <Link href={"/"} className="text-blue-700 dark:text-blue-400">
                    luxera.com
                  </Link>{" "}
                  can be exchanged within 14 days of purchase only if:-
                </p>
                <p>
                  The item(s) is faulty, damaged, or defective at the time of
                  delivery.
                </p>
                <p>
                  The item(s) does not match the original specifications of the
                  product or is found to be not the same as you had actually
                  purchased.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryAndReturnDialog;
