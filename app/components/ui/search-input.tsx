import { Box, Flex, FlexProps, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?(val: string): void;
} & FlexProps;

const SearchInput = (props: Props) => {
  const { value, placeholder, onChange, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Flex
      alignItems="center"
      border="1px solid #979797"
      px={{ base: "10px", md: "26px" }}
      py="2"
      h="44px"
      rounded="8px"
      {...rest}
    >
      <Icon
        as={CiSearch}
        mr={{ base: "5px", md: "10px" }}
        onClick={handleIconClick}
      />
      <Box flexGrow="1">
        <Input
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          outline="none"
          border="none"
          px="0"
          onChange={(e) => onChange?.(e.target.value)}
        />
      </Box>
    </Flex>
  );
};

export default SearchInput;
