import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Image
        src={"/errorpage.jpg"}
        alt="error page image"
        height={500}
        width={500}
      />
    </div>
  );
};

export default page;
