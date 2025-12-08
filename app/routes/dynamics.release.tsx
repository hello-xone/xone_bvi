// import { ActionFunctionArgs } from "@remix-run/node";
import { Flex, Box, ClientOnly, Skeleton } from "@chakra-ui/react";
import ReleaseProgress from "~/components/page/dynamics/ReleaseProgress";
import NeedRelease from "~/components/page/dynamics/NeedRelease";
import Records from "~/components/page/dynamics/Records";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { pageRelease } from "~/api/modules/dynamics";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const params = [...searchParams.entries()].reduce(
    (curr, [key, value]) => ((curr[key] = value), curr),
    {}
  );
  const res = await pageRelease(params);
  return res;
};

export type DataType = {
  records: any[];
  current: number;
  pages: number;
  total: number;
};

export default function DynamicsRelease() {
  const data: DataType = useLoaderData();

  return (
    <Flex
      direction="column"
      pt="!80px"
      bg="url('/images/release/bg.png') no-repeat;"
      bgSize="contain"
    >
      <Flex direction="column" alignItems="center">
        <Box as="h1" textAlign="center" className="text-[48px] font-[700]">
          Welcome to Xone Mainnet！
        </Box>
        <Box
          maxW="770px"
          textAlign="center"
          pb="10px"
          className="text-[16px] font-[400] pt-[10px]"
        >
          From this moment, unleash your mainnet tokens and step into a new era!
          Experience the high performance and expansive ecosystem of Xone
          Mainnet, and embrace the future of decentralization.
        </Box>
      </Flex>
      <Flex direction="column" mt="49px" gap="30px">
        <ClientOnly fallback={<Skeleton />}>
          <ReleaseProgress />
          <NeedRelease />
          <Records data={data} />
        </ClientOnly>
      </Flex>
    </Flex>
  );
}
