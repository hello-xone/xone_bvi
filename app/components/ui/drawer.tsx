import {
  CloseButton,
  Drawer,
  DrawerContentProps,
  Portal,
  useUpdateEffect,
} from "@chakra-ui/react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { ReactSVG } from "react-svg";
import useMobile from "~/hooks/useMobile";

interface DrawerBaseRef {
  open: (args?: any) => void;
  close: () => void;
}

type DrawerBaseProps = {
  children: ReactNode | ((args: any) => ReactNode);
  title: string;
  show?: boolean;
  onCancel?: () => void;
  size?: any;
  contentStyle?: any;
} & DrawerContentProps & {
    [k in string]: any;
  };

const DrawerBase = forwardRef<DrawerBaseRef, DrawerBaseProps>(
  (
    {
      children,
      title,
      show = false,
      onCancel,
      size = "md",
      contentStyle,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [params, setParams] = useState({});

    const isMobile = useMobile();

    useUpdateEffect(() => {
      setOpen(show);
    }, [show]);

    useImperativeHandle(ref, () => ({
      open: (args = {}) => {
        setOpen(true);
        setParams(args);
      },
      close: () => setOpen(false),
    }));

    const handleClose = () => {
      setOpen(false);
      setParams({});
      onCancel?.();
    };

    return (
      <Drawer.Root open={open} size={size}>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              minW={{ base: "full", md: "840px" }}
              rounded={{ base: 0, md: "20px" }}
              p={{ base: 0, md: "22px 24px 57px" }}
              h={{ base: "full", md: "auto" }}
              {...contentStyle}
              {...rest}
            >
              <Drawer.Header
                p={{ base: "0 16px", md: 0 }}
                borderBottom={{ base: "1px solid #F2F4F8", md: "none" }}
              >
                <Drawer.Title
                  data-nobold
                  fontSize={{ base: "16px", md: "32px" }}
                  mx={{ base: "auto", md: 0 }}
                  minH={{ base: "44px", md: "auto" }}
                  fontWeight="700"
                  lineHeight={{ base: "44px", md: "normal" }}
                >
                  {title}
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body p={{ base: "16px 16px 0", md: "30px 0 0" }}>
                {typeof children === "function" ? children(params) : children}
              </Drawer.Body>
              <Drawer.CloseTrigger
                asChild
                left={{ base: "!10px", md: "!auto" }}
                right={{ base: "!auto", md: "!30px" }}
                top={{ base: "0", md: "10px" }}
                onClick={handleClose}
              >
                {isMobile ? (
                  <ReactSVG
                    src="/images/icons/arrow.svg"
                    className="mt-[10px]"
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
);

export default DrawerBase;
