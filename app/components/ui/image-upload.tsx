"use client";

import {
  Box,
  Button,
  FileUpload,
  Float,
  Stack,
  useFileUploadContext,
  useUpdateEffect,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

const PreviewImages = ({ value, imgClass, onChange = () => {} }: TProps) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    if (value instanceof File) {
      fileUpload.setFiles([value]);
    }
  }, [value]);

  useEffect(() => {
    onChange(files);
  }, [files.length]);

  if (!files.length) return null;

  return (
    <FileUpload.ItemGroup flexGrow="1">
      {files.map((file) => (
        <FileUpload.Item {...imgClass} boxSize="20" file={file} key={file.name}>
          <Box w="full" maxH="140px" overflow="hidden">
            <FileUpload.ItemPreviewImage w="full" maxH="195px" />
          </Box>
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger
              w="20px"
              h="20px"
              layerStyle="fill.solid"
            >
              <LuX className="scale-[1.4]" />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

type TProps = {
  value?: any;
  imgClass?: { [key: string]: string | number };
  onChange: (files: File[]) => void;
};

export default function ImageUpload({
  value = "",
  imgClass = { minW: "120px", minH: "120px" },
  onChange = () => {},
}: TProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<File[]>([]);

  useEffect(() => {
    if (value instanceof File) {
      setSelected([value]);
    }
  }, [value]);

  useUpdateEffect(() => {
    onChange(selected);
  }, [selected.length]);

  return (
    <FileUpload.Root accept={["image/png", "image/jpeg"]}>
      <FileUpload.HiddenInput />
      {value && !selected.length ? (
        <Button variant="outline" {...imgClass} p="0">
          <Image
            src={`${import.meta.env.VITE_APP_IMAGE_BASE_URL}${value}`}
            {...imgClass}
            maxH="0"
            py="15px"
            objectFit="contain"
          />
          <Float placement="top-end" bg="black" onClick={() => onChange([])}>
            <LuX color="white" />
          </Float>
        </Button>
      ) : (
        <FileUpload.Trigger asChild>
          {selected.length ? (
            <Box hidden />
          ) : (
            <Button variant="outline" {...imgClass}>
              <Stack alignItems="center">
                <Image src="/images/bvi/upload_img.png" w="22px" />
                {t("Click to upload")}
              </Stack>
            </Button>
          )}
        </FileUpload.Trigger>
      )}
      <PreviewImages value={value} onChange={setSelected} imgClass={imgClass} />
    </FileUpload.Root>
  );
}
