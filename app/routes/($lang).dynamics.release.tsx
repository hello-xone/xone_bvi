// import { ActionFunctionArgs } from "@remix-run/node";
import { Flex, Box, ClientOnly, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ReleaseProgress from "~/components/page/dynamics/ReleaseProgress";
import NeedRelease from "~/components/page/dynamics/NeedRelease";
import Records from "~/components/page/dynamics/Records";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { pageRelease } from "~/api/modules/dynamics";
import useMobile from "~/hooks/useMobile";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const params = [...searchParams.entries()].reduce(
    (curr, [key, value]) => ((curr[key] = value), curr),
    {}
  );
  let res: any = { records: [] };
  try {
    res = await pageRelease(params);
    // console.log(res);
  } catch (error) {}
  return res;
};

export type DataType = {
  records: any[];
  current: number;
  pages: number;
  total: number;
};

export default function DynamicsRelease() {
  const { t } = useTranslation();
  const data: DataType = useLoaderData();
  const isMobile = useMobile();
  const [curlEpoch, setCurlEpoch] = useState(0);

  return (
    <Flex
      direction="column"
      pt={{ base: "!50px", md: "!80px" }}
      px={{ base: "!16px", md: "!22px" }}
      bg={`url('/images/dynamics/bg${isMobile ? "_h5" : ""}.png') no-repeat;`}
      bgSize="contain"
      bgPos={{ base: "center 40px", md: "inherit" }}
    >
      <Flex direction="column" alignItems="center">
        <Box
          as="h1"
          textAlign="center"
          fontSize={{ base: "28px", md: "48px" }}
          fontWeight="700"
          lineHeight={{ base: "30px", md: "inherit" }}
        >
          {t("Welcome to Xone Mainnet！")}
        </Box>
        <Box
          data-nobold
          maxW="770px"
          textAlign="center"
          pb="10px"
          pt={{ base: "12px", md: 0 }}
          fontSize={{ base: "13px", md: "16px" }}
          fontWeight="400"
        >
          {t(
            "From this moment, unleash your mainnet tokens and step into a new era! Experience the high performance and expansive ecosystem of Xone Mainnet, and embrace the future of decentralization."
          )}
        </Box>
      </Flex>
      <Flex
        direction="column"
        mt={{ base: "26px", md: "49px" }}
        gap={{ base: "20px", md: "30px" }}
      >
        <ClientOnly fallback={<Skeleton />}>
          <ReleaseProgress updateCurlEpoch={setCurlEpoch} />
          <NeedRelease curlEpoch={curlEpoch} />
          <Records data={data} />
        </ClientOnly>
      </Flex>
    </Flex>
  );
}
