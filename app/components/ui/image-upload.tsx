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
import { LuFileImage, LuX } from "react-icons/lu";

const PreviewImages = ({ imgClass, onChange = () => {} }: TProps) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  useEffect(() => {
    onChange(files);
  }, [files.length]);

  if (!files.length) return null;

  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item {...imgClass} boxSize="20" file={file} key={file.name}>
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

type TProps = {
  value?: string;
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

  useUpdateEffect(() => {
    onChange(selected);
  }, [selected.length]);

  return (
    <FileUpload.Root accept="image/*" disabled={!!value || !!selected.length}>
      <FileUpload.HiddenInput />
      {value && !selected.length ? (
        <Button variant="outline" {...imgClass} p="0">
          <Image
            src={value}
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
                <LuFileImage /> {t("Click to upload")}
              </Stack>
            </Button>
          )}
        </FileUpload.Trigger>
      )}
      <PreviewImages onChange={setSelected} imgClass={imgClass} />
    </FileUpload.Root>
  );
}
