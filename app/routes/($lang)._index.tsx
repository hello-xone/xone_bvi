import { Stack } from "@chakra-ui/react";
import Activity from "~/components/page/home/Activity";
import Banner from "~/components/page/home/Banner";
import NaturalResources from "~/components/page/home/NaturalResources";
import Stats from "~/components/page/home/Stats";
import TokenRelease from "~/components/page/home/TokenRelease";
import Tools from "~/components/page/home/Tools";
import FAQ from "~/components/page/home/FAQ";
import { artwork, stats, statsByNet, activity } from "~/api/modules/home";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useRafInterval } from "ahooks";
import Grid from "~/components/ui/grid";
import { ActionFunction, data } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import { formatUnits } from "viem";
import { formatDecimal } from "~/utils/format/number";

const getGasFee = async () => {
  try {
    const stats = await statsByNet();

    const wei = stats.gas_prices.average.wei;
    if (Number(wei) === 0) return "0.00";
    return stats.gas_prices.average
      ? formatDecimal(formatUnits(wei, 9).toString())
      : undefined;
  } catch (err) {
    console.error(err);
  }
};

export const loader = async () => {
  let res = [{}, {}, {}];
  try {
    res = (await Promise.all([
      stats(),
      artwork(),
      getGasFee(),
      activity(),
    ])) as any;
  } catch (error) {}
  return res;
};

export const action: ActionFunction = async ({ request }) => {
  const userInfo = await request.json();
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userInfo", userInfo ?? {});

  return data(
    {},
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
      status: 204,
    }
  );
};

export default function Index() {
  const [
    { counters = [] },
    { data: { total: arkwork = 0 } = {} },
    gasFee,
    { entries = [] } = {},
  ] = useLoaderData<any>();

  const averageTransactionCost = counters.find(
    (item: any) => item.id === "averageTxnFee24h"
  )?.value;

  const newTxns24h = counters.find(
    (item: any) => item.id === "newTxns24h"
  )?.value;

  const averageBlockTime = counters.find(
    (item: any) => item.id === "averageBlockTime"
  )?.value;

  const activeAccounts = counters.find(
    (item: any) => item.id === "totalAccounts"
  )?.value;

  const navigate = useNavigate();
  useRafInterval(() => {
    navigate(`?${new Date().valueOf()}`, { preventScrollReset: true });
  }, 10000);

  return (
    <Stack gap={{ base: "16px", md: "30px" }} p={{ base: "!0", md: "!22px" }}>
      <Banner />
      <Stack
        gap={{ base: "16px", md: "30px" }}
        padding={{ base: "16px", md: 0 }}
        pt="0"
      >
        <Stats
          {...{
            averageTransactionCost,
            averageBlockTime,
            gasFee,
            arkwork,
            newTxns24h,
            activeAccounts,
          }}
        />
        <TokenRelease />
        <Activity entries={entries} />
        <Grid w={{ base: "full", md: "620px" }} gap="22px">
          <NaturalResources />
          <Tools />
        </Grid>
        <FAQ />
      </Stack>
    </Stack>
  );
}
