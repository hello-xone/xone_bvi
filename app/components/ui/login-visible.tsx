import { Show } from "@chakra-ui/react";
import useUserStore from "~/store/userStore";

export default function LoginVisible({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin } = useUserStore();
  return <Show when={isLogin}>{children}</Show>;
}
