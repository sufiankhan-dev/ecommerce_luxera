import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface Props {
  description: string;
  compositionAndCare: string[];
}

const DescriptionDropdown = ({ description, compositionAndCare }: Props) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full md:hidden mt-3"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase font-bold text-sm dark:text-gray-300">
            Description
          </AccordionTrigger>
          <AccordionContent>
            {description && (
              <div>
                <span className="uppercase font-bold text-sm dark:text-gray-300">
                  Product Description:
                </span>
                <p className="my-4 text-sm text-gray-700 leading-relaxed uppercase dark:text-gray-400">
                  {description}
                </p>
              </div>
            )}

            {compositionAndCare && compositionAndCare.length > 0 && (
              <div className="uppercase flex-col pt-5">
                <span className="font-bold text-sm dark:text-gray-300">
                  Composition & Care
                </span>
                <div className="pt-4 text-gray-700 leading-relaxed text-sm dark:text-gray-400">
                  {compositionAndCare.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="uppercase font-bold text-sm dark:text-gray-300">
            Deliveries & Returns
          </AccordionTrigger>
          <AccordionContent>
            <span className="font-bold text-sm text-black dark:text-white uppercase tracking-wide">
              Deliveries:
            </span>
            <div className="mt-1 leading-relaxed tracking-wide mb-4 dark:text-gray-400">
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
            <div className="mt-1 leading-relaxed tracking-wide dark:text-gray-400">
              <p>
                All products purchased from{" "}
                <Link href={"/"} className="text-blue-700 dark:text-blue-400">
                  luxera.com
                </Link>{" "}
                can be exchanged within 14 days of purchase only if:-
              </p>
              <p>
                The item(s) is faulty, damaged or defective at the time of
                delivery.
              </p>
              <p>
                The item(s) does not match the original specifications of the
                product or is found to be not the same as you had actually
                purchased.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DescriptionDropdown;
