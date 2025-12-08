import {
  Button,
  CloseButton,
  Field,
  Flex,
  HStack,
  Input,
  RadioGroup,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { For } from "@chakra-ui/react";
import ImageUpload from "~/components/ui/image-upload";
import { FieldConfig } from "./setting.config";
import Font from "~/components/ui/font";
import SocializeSelect, { socializes } from "./SocializeSelect";
import { useEffect, useState } from "react";
import useMobile from "~/hooks/useMobile";

type RenderFieldProps = {
  field: FieldConfig;
  register?: any;
  setValue?: (name: string, value: any) => void;
  watch?: (name: string) => any;
  error?: any;
};

export const renderField = ({
  field,
  register,
  watch,
  error,
  setValue,
}: RenderFieldProps) => {
  const { t } = useTranslation();
  const isMobole = useMobile();
  const [socialList, setSocialList] = useState([]);

  const removeSocialize = (index: number) => {
    setValue?.(socialList[index].name, "");
    setSocialList((pre) => {
      pre.splice(index, 1);
      return [...pre];
    });
  };

  useEffect(() => {
    const twitter = watch?.("twitter");
    const telegram = watch?.("telegram");
    const discord = watch?.("discord");
    const website = watch?.("website");
    const objs = { twitter, telegram, discord, website };
    const values = Object.entries(objs).filter((item) => item[1]);
    if (values.length) {
      setSocialList([
        ...socializes.items
          .filter((item) => values.some((v) => item.name === v[0]))
          .map((item) => ({ ...item, address: objs[item.name] })),
      ]);
    }
  }, [watch?.("twitter")]);

  switch (field.type) {
    case "image":
      return (
        <Field.Root
          orientation={{ base: "vertical", md: "horizontal" }}
          required={field.required}
        >
          <Field.Label>
            {t(field.label)} {field.required && <Field.RequiredIndicator />}
          </Field.Label>
          <ImageUpload
            value={watch?.(field.name)}
            imgClass={
              field.name === "background"
                ? {
                    minW: isMobole ? "300px" : "600px",
                    minH: isMobole ? "120px" : "195px",
                  }
                : undefined
            }
            onChange={([file]) => setValue?.(field.name, file ?? "")}
          />
        </Field.Root>
      );

    case "input":
      return (
        <Field.Root
          orientation={{ base: "vertical", md: "horizontal" }}
          required={field.required}
        >
          <Field.Label>
            {t(field.label)} {field.required && <Field.RequiredIndicator />}
          </Field.Label>
          <Input {...register?.(field.name, { required: field.required })} />
          {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
        </Field.Root>
      );

    case "textarea":
      return (
        <Field.Root
          orientation={{ base: "vertical", md: "horizontal" }}
          required={field.required}
        >
          <Field.Label>
            {t(field.label)} {field.required && <Field.RequiredIndicator />}
          </Field.Label>
          <Textarea {...register?.(field.name, { required: field.required })} />
          {error && <Field.ErrorText>{error.message}</Field.ErrorText>}
        </Field.Root>
      );

    case "social":
      return (
        <Stack bg="#F7F7F7" p="12px" gap="12px" rounded="8px">
          {socialList.map((social, index) => (
            <Flex key={social.name} gap="8px" alignItems="center">
              <CloseButton onClick={() => removeSocialize(index)} />
              <Field.Root bg="white" w={{ base: "130px", md: "180px" }}>
                <SocializeSelect
                  value={social}
                  selected={socialList}
                  onChange={(value) => {
                    setSocialList((pre) => {
                      pre[index] = { ...value, address: "" };
                      return [...pre];
                    });
                  }}
                />
              </Field.Root>
              <Field.Root bg="white" flex={1}>
                <Input
                  defaultValue={social.address}
                  onChange={(e) => {
                    setValue?.(social.name, e.target.value);
                  }}
                />
              </Field.Root>
            </Flex>
          ))}
          {
            <Button
              rounded="6px"
              bg="#FF0206"
              w="max-content"
              px="16px"
              h={{ base: "32px", md: "40px" }}
              disabled={socialList.length === socializes.items.length}
              onClick={() =>
                setSocialList((pre) => {
                  const ids = pre.map((item) => item.id);
                  const newList = socializes.items.filter(
                    (item) => !ids.includes(item.id)
                  );
                  return [...pre, { ...newList[0], address: "" }];
                })
              }
            >
              + {t("Add")}
            </Button>
          }
        </Stack>
      );

    case "switch":
      return (
        <Field.Root py="8px" orientation={{ base: "horizontal" }}>
          <Field.Label minW={{ base: "60%", md: "max-content" }}>
            <Stack gap="8px">
              <Font size="14px" weight="500">
                {t(field.label)}
              </Font>
              <Font size="14px" weight="500" color="#979797">
                {t(field.description)}
              </Font>
            </Stack>
          </Field.Label>
          <Switch.Root
            size="lg"
            {...register?.(field.name)}
            value={watch?.(field.name)}
            defaultChecked={watch?.(field.name) === "on"}
          >
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
          </Switch.Root>
        </Field.Root>
      );

    case "radio":
      if (!field.options) return null;
      return (
        <Field.Root
          py="8px"
          orientation={{ base: "vertical", md: "horizontal" }}
        >
          <Field.Label minW={{ base: "full", md: "max-content" }}>
            <Stack gap="8px">
              <Font size="14px" weight="500">
                {t(field.label)}
              </Font>
              <Font size="14px" weight="500" color="#979797">
                {t(field.description)}
              </Font>
            </Stack>
          </Field.Label>
          <RadioGroup.Root
            defaultValue={watch?.(field.name) || field.defaultValue}
            onValueChange={({ value }) => setValue?.(field.name, value)}
          >
            <HStack
              flexDirection={{ base: "column", md: "row" }}
              alignItems="flex-start"
              pt={{ base: "20px", md: "0" }}
              gap="6"
            >
              <For each={field.options}>
                {(item) => (
                  <RadioGroup.Item key={item.label} value={item.value as any}>
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>
                      <Stack gap="8px">
                        <Font size="14px" weight="500">
                          {t(item.label)}
                        </Font>
                        <Font size="14px" weight="500" color="#979797">
                          {t(item.subLabel)}
                        </Font>
                      </Stack>
                    </RadioGroup.ItemText>
                  </RadioGroup.Item>
                )}
              </For>
            </HStack>
          </RadioGroup.Root>
        </Field.Root>
      );

    default:
      return null;
  }
};
