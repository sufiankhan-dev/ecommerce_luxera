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
      <Accordion type="single" collapsible className="w-full md:hidden mt-3">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase font-bold text-sm">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <span className="uppercase font-bold text-sm">
              Product Description:
            </span>
            <p className="my-4 text-sm text-gray-700 leading-relaxed uppercase">
              {description}
            </p>
            {compositionAndCare && compositionAndCare.length > 0 && (
              <div className="uppercase flex-col pt-5">
                <span className="font-bold text-sm">Composition & Care</span>
                <div className="pt-4 text-gray-700 leading-relaxed text-sm">
                  {compositionAndCare.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="uppercase font-bold text-sm">
            Deliveries & Returns
          </AccordionTrigger>
          <AccordionContent>
            <span className="font-bold text-sm text-black uppercase tracking-wide">
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
            <span className="font-bold text-sm text-black uppercase tracking-wide">
              Returns:
            </span>
            <div className="mt-1 leading-relaxed tracking-wide">
              <p>
                All products purchased from{" "}
                <Link href={"/"} className="text-blue-700">
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
