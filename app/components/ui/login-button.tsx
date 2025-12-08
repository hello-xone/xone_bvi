import { Box } from "@chakra-ui/react";
import { useWalletKit } from "@web3jskit/walletkit";
import useUserStore from "~/store/userStore";
import React from "react";

type Props = {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
};

export default function LoginButton({ children }: Props) {
  const { isLogin } = useUserStore();
  const { connect } = useWalletKit();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      connect();
      return;
    }

    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(e);
    }
  };

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement<{ onClick?: React.MouseEventHandler }>(children, {
            onClick: handleClick,
          })
        : children}
    </>
  );
}
