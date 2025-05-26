import {
  CloseButton,
  Dialog,
  DialogContentProps,
  Portal,
  useUpdateEffect,
} from "@chakra-ui/react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { ReactSVG } from "react-svg";
import useMobile from "~/hooks/useMobile";

interface DialogBaseRef {
  open: (args?: any) => void;
  close: () => void;
}

type DialogBaseProps = {
  children: ReactNode | ((args: any) => ReactNode);
  title: string;
  show?: boolean;
  onCancel?: () => void;
  size?: any;
  contentStyle?: any;
} & DialogContentProps & {
    [k in string]: any;
  };

const DialogBase = forwardRef<DialogBaseRef, DialogBaseProps>(
  (
    {
      children,
      title,
      show = false,
      onCancel,
      size = "md",
      contentStyle,
      bg = "white",
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
      <Dialog.Root open={open} placement="center" size={size}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              minW={{ base: "full", md: "840px" }}
              rounded={{ base: 0, md: "20px" }}
              p={{ base: 0, md: "22px 24px 57px" }}
              h={{ base: "full", md: "auto" }}
              {...contentStyle}
              {...rest}
            >
              <Dialog.Header
                p={{ base: "0 16px", md: 0 }}
                borderBottom={{ base: "1px solid #F2F4F8", md: "none" }}
              >
                <Dialog.Title
                  data-nobold
                  fontSize={{ base: "16px", md: "32px" }}
                  mx={{ base: "auto", md: 0 }}
                  minH={{ base: "44px", md: "auto" }}
                  fontWeight="700"
                  lineHeight={{ base: "44px", md: "normal" }}
                >
                  {title}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body p={{ base: "16px 16px 0", md: "30px 0 0" }} bg={bg}>
                {typeof children === "function" ? children(params) : children}
              </Dialog.Body>
              <Dialog.CloseTrigger
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
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);

export default DialogBase;
