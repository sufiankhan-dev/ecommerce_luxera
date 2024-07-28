import Hero from "@/components/Hero";
import Newest from "@/components/Newest";
import Wrapper from "@/components/Wrapper";
import { client } from "../../sanity/lib/client";
import { HeroImages } from "../../type";
import HotItems from "@/components/HotItems";

async function getData() {
  const query = `*[_type == 'heroImage'][0]{
    image1,
      image2,
      image3
    }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: HeroImages = await getData();
  return (
    <main>
      <Hero image1={data.image1} image2={data.image2} image3={data.image3} />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[40px] md:my-[70px]">
          <div className="text-[28px] md:text-[34px] mb-4 font-semibold leading-tight text-gray-900">
            Elevate Your Style
          </div>
          <div className="text-md md:text-xl text-gray-500">
            Experience comfort and sophistication with our latest collection.
            Crafted with premium materials, each piece ensures you look chic and
            feel fabulous all day long.
          </div>
        </div>
        {/* heading and paragaph end */}
      </Wrapper>
      <Newest />
      <HotItems />
    </main>
  );
}
