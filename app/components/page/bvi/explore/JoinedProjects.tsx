import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Stack,
  Wrap,
  type ButtonProps,
} from "@chakra-ui/react";
import { Link, useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useRequest } from "alova/client";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ReactSVG } from "react-svg";
import { teamJoinList } from "~/api/modules/bvi";
import Font from "~/components/ui/font";
import useUserStore from "~/store/userStore";
import Setting from "./Setting";
import React, { useState } from "react";
import clsx from "clsx";
import useMobile from "~/hooks/useMobile";

type TButton = {
  children: React.ReactNode;
  iconColor?: string;
  stat?: boolean;
  loading?: boolean;
} & ButtonProps;

export function EnterDetailButton({
  children,
  iconColor = "black",
  stat = true,
  ...args
}: TButton) {
  const isMobile = useMobile();
  return (
    <Flex alignItems="center" gap="20px">
      <Box className="fill-[black] hidden" />
      <Box className="fill-[white] hidden" />
      {stat && (
        <ReactSVG
          src="/images/icons/stat.svg"
          className={clsx({
            [`[&_svg]:fill-[${iconColor}]`]: true,
            "[&_svg]:w-[35px] [&_svg]:h-[39px]": !isMobile,
            "[&_svg]:w-[20px] [&_svg]:h-[24px]": isMobile,
          })}
        />
      )}
      <Button
        variant="ghost"
        rounded="30px"
        h={{ base: "40px", md: "55px" }}
        border="1px solid #C6C6C6"
        fontSize={{ base: "16px", md: "24px" }}
        fontWeight="600"
        color="black"
        pos="relative"
        px={{ base: "20px", md: "40px" }}
        {...args}
      >
        <Box pos="relative" display="flex" alignItems="center" gap="20px">
          <Box>{children}</Box>
          <ReactSVG  src="/images/icons/arrow-right.svg"/>
        </Box>
      </Button>
    </Flex>
  );
}

export default function JoinedProjects() {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const types = {
    person: t("Joined organization"),
    organization: t("Joined projects"),
    project: t("My Project"),
  };

  const { data }: { data: any; [key: string]: any } = useRequest(
    () => teamJoinList({ type: "organization" }),
    {
      force: true,
      initialData: { total: 0, list: [] },
    }
  );

  const enterDetail = () =>
    userInfo.team
      ? navigate(`/bvi/explore/${userInfo.role}/${userInfo.team}`)
      : setSettingOpen(true);

  const [settingOpen, setSettingOpen] = useState(false);

  const action = userInfo.team ? t("Enter") : t("Create");

  return (
    <Stack bg="white" rounded="12px" p="20px" alignItems="center">
      <Setting
        open={settingOpen}
        identity={userInfo.role}
        onClose={setSettingOpen}
      />
      <Wrap w="full" alignItems="center" gap="20px">
        <Font size={{ base: "16px", md: "32px" }} weight="600">
          {types[userInfo.role]} ({data.total})
        </Font>
        <AvatarGroup gap="20px" spaceX="0" mr="auto">
          {data.list?.map?.((item) => (
            <Avatar.Root
              key={item.no}
              w="48px"
              h="48px"
              m="0"
              onClick={() => navigate(`/bvi/explore/${item.type}/${item.no}`)}
            >
              <Avatar.Image src={item.logo} />
            </Avatar.Root>
          ))}
        </AvatarGroup>
        {userInfo.role === "project" ? (
          <EnterDetailButton onClick={enterDetail}>
            {action} {t("my project")}
          </EnterDetailButton>
        ) : (
          <Link to="/bvi/explore/list">
            <Button
              data-nobold
              variant="outline"
              rounded="30px"
              color="#FF0206"
              h={{ base: "30px", md: "40px" }}
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight="500"
              borderColor="#FF0206"
            >
              {t("More")}
            </Button>
          </Link>
        )}
      </Wrap>
      {userInfo.role === "organization" && (
        <Flex
          w="full"
          justifyContent="center"
          pt="20px"
          borderTop="1px solid #F2F4F8"
        >
          <EnterDetailButton onClick={enterDetail}>
            {action} {t("my organization")}
          </EnterDetailButton>
        </Flex>
      )}
    </Stack>
  );
}
