import { Box, Flex, Text, Image } from "@mantine/core";
import React from "react";
import "@/styles/progress.css";

const Loader = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Flex
      {...props}
      ref={ref}
      justify={"center"}
      align={"center"}
      direction="column"
      h="70vh"
    >
      <Flex m="sm">
        <div className="flex items-center gap-2">
          <Box className="p-3 rounded-xs text-white text-xl font-bold">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="h-[40px] w-fit object-contain animate-spin"
            />
          </Box>
        </div>
      </Flex>
      <Text size="sm" c="dimmed">
        Carregando a página
      </Text>
    </Flex>
  );
});

Loader.displayName = "Loader";

export { Loader };
