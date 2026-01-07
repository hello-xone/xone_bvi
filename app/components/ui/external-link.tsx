import { BoxProps, Flex, Icon } from '@chakra-ui/react';
import { memo, ReactNode, useMemo } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';

import { getToProps } from '~/utils/helper';

type Props = {
  children: ReactNode;
  hasIcon?: boolean;
  to?: string | URL;
} & BoxProps;

const ExternalLink = (props: Props) => {
  const { to, hasIcon = true, ...rest } = props;

  const toProps = useMemo(() => {
    return getToProps(to);
  }, [to]);

  return (
    <Flex display='inline-flex' alignItems='center' {...rest} {...toProps}>
      {props.children}
      {hasIcon && <Icon as={MdOutlineArrowOutward} ml='6px' />}
    </Flex>
  );
};

export default memo(ExternalLink);
