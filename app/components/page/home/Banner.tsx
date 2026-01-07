import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import { EXTERNAL_LINKS } from "~/utils/external";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMobile from "~/hooks/useMobile";

export default function Banner() {
  const isMobile = useMobile();

  const imgList = [
    {
      src: `/images/temp/home_banner${isMobile ? "_h5" : ""}.png`,
      href: EXTERNAL_LINKS.website,
    },
    {
      src: `/images/temp/home_banner_01${isMobile ? "_h5" : ""}.png`,
      href: EXTERNAL_LINKS.docs + "blog/monthly/april-2025",
    },
    {
      src: `/images/temp/home_banner_02${isMobile ? "_h5" : ""}.png`,
      href: EXTERNAL_LINKS.docs + "bvi/readme",
    },
  ];

  const settings = {
    dots: true,
    infinite: imgList.length > 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass:
      "!flex justify-center gap-[19px] mt-[10px] text-[0] [&>li>button]:w-[40px] [&>li>button]:h-[4px] [&>li]:rounded-[8px] [&_button]:cursor-pointer [&>li]:bg-[#C6C6C6] [&>.slick-active]:bg-[#FF0206] [&>.slick-active>button]:w-[56px] [&>li>button]:transition-all [&>li]:transition-all",
  };
  return (
    <Box
      maxW="full"
      userSelect="none"
      rounded={{ base: "0", md: "12px" }}
      overflow="hidden"
    >
      <Slider {...settings}>
        {imgList.map((item) => (
          <a href={item.href} target="_blank" key={item.src}>
            <Image
              rounded={{ base: "0", md: "12px" }}
              w="full"
              src={item.src}
            />
          </a>
        ))}
      </Slider>
    </Box>
  );
}
