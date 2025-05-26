import { useEffect, useRef, useState } from "react";
import { Box, useUpdateEffect } from "@chakra-ui/react";
// import { NumberFlip } from "number-flip-animation";
// import "number-flip-animation/dist/styles.css";
import { NumberFlip } from "~/lib/number-flip";

import "~/lib/number-flip/styles.css";

interface Props {
  value: number;
}

export default function CountUp({ value }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef(null) as any;

  useEffect(() => {
    if (flipRef.current) return;
    flipRef.current = new NumberFlip({
      rootElement: boxRef.current,
    });
  }, []);

  useEffect(() => {
    flipRef.current.setNumber(value);
  }, [value]);

  return <Box ref={boxRef} />;
}
