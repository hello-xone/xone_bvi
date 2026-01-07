import { RangePicker as DateRangePicker } from "rc-picker";
import enUS from "rc-picker/lib/locale/en_US";
import generateConfig from "rc-picker/lib/generate/dayjs";
import { JSX } from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@chakra-ui/react";

import "rc-picker/assets/index.css";
import "~/styles/picker.less";

type Props = {
  value: any[];
  format?: string;
  separator?: JSX.Element | string;
  suffixIcon?: JSX.Element;
  onChange?: (value: any[]) => void;
};

export default function RangePicker(props: Props) {
  const {
    value,
    format = "YYYY-MM-DD HH:mm:ss",
    separator = <Box pr="20px">To</Box>,
    suffixIcon = (
      <ReactSVG src="/images/icons/calendar.svg" className="w-[12px]" />
    ),
    onChange = () => {},
  } = props;
  return (
    <DateRangePicker
      value={value as [any, any]}
      locale={enUS}
      generateConfig={generateConfig}
      separator={separator}
      showTime
      format={format}
      suffixIcon={suffixIcon}
      className="!border-[#E8E8E8] !h-[44px]"
      onChange={onChange}
    />
  );
}
