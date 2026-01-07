import { Box } from "@chakra-ui/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "~/components/ui/tooltip";

type Props = {
  children?: React.ReactNode;
  content: string | number;
};

export default function Tip({ children, content, ...rest }: Props) {
  return (
    <Tooltip content={content} openDelay={300}>
      <Box>
        {children ?? (
          <AiOutlineQuestionCircle
            color="#B3B3B3"
            size="18px"
            cursor="pointer"
            {...rest}
          />
        )}
      </Box>
    </Tooltip>
  );
}
