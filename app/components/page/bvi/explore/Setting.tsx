"use client";

import {
  Box,
  Button,
  Center,
  CloseButton,
  Drawer,
  Fieldset,
  For,
  Portal,
  Spinner,
  Stack,
  useUpdateEffect,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Font from "~/components/ui/font";
import { settingConfig } from "./setting.config";
import { renderField } from "./renderField";
import { useForm } from "react-hook-form";
import { toaster } from "~/components/ui/toaster";
import { useRequest } from "alova/client";
import { teamEdit, uploadImage } from "~/api/modules/bvi";
import {
  useDebounceFn,
  useDeepCompareEffect,
  useLocalStorageState,
} from "ahooks";
import { ReactSVG } from "react-svg";
import useMobile from "~/hooks/useMobile";
import { useEffect, useState } from "react";
import useUserStore from "~/store/userStore";

type Props = {
  open: boolean;
  data?: any;
  identity: string;
  onClose: (open?: boolean) => void;
  onSuccess?: () => void;
};

let valuesCache = {};
export default function Setting(props: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const { userInfo } = useUserStore();

  const {
    open = false,
    identity,
    data = {},
    onClose = () => {},
    onSuccess = () => {},
  } = props;

  const defaultValues = {
    no: "",
    logo: "",
    background: "",
    description: "",
    title: "",
    contract: "",
    owner_address: "",
    invite: false,
    public: false,
    down: false,
    website: "",
    discord: "",
    twitter: "",
    telegram: "",
  };

  const [defaultValuesCache, setDefaultValuesCache] = useLocalStorageState(
    "settingDefaultValues",
    {
      defaultValue: { ...defaultValues },
    }
  );

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
  });

  const watchedValues = watch();
  useDeepCompareEffect(() => {
    if (userInfo.team || !open) return;
    const filteredValues = Object.fromEntries(
      Object.entries(watchedValues).filter(([_, value]) => value !== undefined)
    );
    const values = {
      ...defaultValues,
      ...defaultValuesCache,
      ...filteredValues,
    };

    valuesCache = { ...values };

    delete values.logo;
    delete values.background;

    setDefaultValuesCache(values);
  }, [watchedValues]);

  useEffect(() => {
    if (!userInfo.team) {
      updateValues(defaultValuesCache);
    }
  }, [userInfo.team]);

  useUpdateEffect(() => {
    if (open && Object.keys(valuesCache).length) {
      updateValues(valuesCache);
    }
  }, [open]);

  const {
    actions: { getUserInfo },
  } = useUserStore();

  const updateValues = (data: any = defaultValues) => {
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, data[key]);
    });
  };

  useDeepCompareEffect(() => {
    if (userInfo.team) {
      updateValues(data);
    }
  }, [data]);

  const [saveLoading, setSaveLoading] = useState(false);

  const {
    send,
    onSuccess: editSuccess,
    onComplete,
  } = useRequest(teamEdit, {
    immediate: false,
  });

  editSuccess(() => {
    toaster.create({
      description: t("Saved successfully"),
      type: "success",
    });
    valuesCache = {};
    onSuccess();
    getUserInfo();
    onClose(false);
  });

  onComplete(() => {
    setSaveLoading(false);
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { public: pub, down, logo = "", background = "", ...rest } = values;

      const files = {
        logo,
        background,
      };

      setSaveLoading(true);
      let uploadRes = null;
      if (logo instanceof File || background instanceof File) {
        uploadRes = await uploadImage(files);
      }

      if (uploadRes?.some?.((item) => !item.value)) {
        toaster.create({
          description: t("Image upload failed"),
          type: "error",
        });
        setSaveLoading(false);
        return;
      }

      send({
        ...rest,
        public: JSON.parse(pub),
        down: JSON.parse(down),
        ...files,
      });
    } catch (error) {
      setSaveLoading(false);
      toaster.create({
        description: t("Saved failed"),
        type: "error",
      });
    }
  });

  return (
    <Drawer.Root open={open} onOpenChange={(e) => onClose(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner data-nobold>
          <Drawer.Content
            minW={{ base: "full", md: "1175px" }}
            rounded={{ base: 0, md: "20px 0 0 20px" }}
          >
            <Drawer.Header
              minH={{ base: "44px", md: "auto" }}
              p={{ base: 0, md: "24px 24px 16px" }}
              lineHeight={{ base: "44px", md: "normal" }}
              borderBottom={{ base: "1px solid #F2F4F8", md: "none" }}
            >
              <Drawer.Title textAlign={{ base: "center", md: "left" }}>
                <Font size={{ base: "16px", md: "24px" }} weight="600">
                  {!!data.no ? t("Edit") : t("Create")} {t(identity)}
                </Font>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p="0">
              <Stack
                as="form"
                gap="30px"
                css={{
                  "--field-label-width": "200px",
                  "--chakra-colors-color-palette-solid": "#02D300",
                }}
                onSubmit={onSubmit}
              >
                <Box
                  hidden={!saveLoading}
                  pos="absolute"
                  zIndex={3}
                  inset="0"
                  bg="bg/80"
                  rounded="20px 0 0 20px"
                >
                  <Center h="full">
                    <Stack alignItems="center">
                      <Spinner color="teal.500" />
                      <Font data-nobold size="12px" color="#666">
                        {t("Saveing, please wait")}...
                      </Font>
                    </Stack>
                  </Center>
                </Box>
                <Fieldset.Root
                  size="lg"
                  p={{ base: "16px", md: "8px 24px" }}
                  minW="full"
                  overflow="hidden"
                >
                  {Object.keys(errors).length > 0 && (
                    <Fieldset.ErrorText>
                      {t("Please check and fill in the required fields")}
                    </Fieldset.ErrorText>
                  )}
                  <Fieldset.Content>
                    <For each={settingConfig}>
                      {(section) => (
                        <>
                          <Stack
                            data-nobold
                            gap="12px"
                            py="8px"
                            borderBottom="1px solid #F2F4F8"
                          >
                            <Font size="16px" weight="700">
                              {t(section.title)}
                            </Font>
                            <Font
                              data-nobold
                              size="14px"
                              weight="600"
                              color="#979797"
                            >
                              {t(section.description)}
                            </Font>
                          </Stack>
                          <For each={section.fields}>
                            {(field) =>
                              renderField({
                                field,
                                register,
                                setValue,
                                watch,
                                error: errors[field.name],
                              })
                            }
                          </For>
                        </>
                      )}
                    </For>
                  </Fieldset.Content>
                  <Button
                    type="submit"
                    alignSelf="center"
                    px={{ base: "50px", md: "130px" }}
                    bg="#FF0206"
                    rounded="12px"
                    fontSize="18px"
                    fontWeight="500"
                    mt="50px"
                    mb="30px"
                  >
                    {t("Confirm Save")}
                  </Button>
                </Fieldset.Root>
              </Stack>
            </Drawer.Body>
            <Drawer.CloseTrigger
              asChild
              right={{ base: "!auto", md: "!30px" }}
              top={{ base: "0", md: "10px" }}
            >
              {isMobile ? (
                <ReactSVG
                  src="/images/icons/arrow.svg"
                  className="mt-[10px] ml-[10px]"
                />
              ) : (
                <CloseButton size="lg" />
              )}
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
