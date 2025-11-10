import { Title, Text } from "@mantine/core";
import React, { ReactNode } from "react";

export interface TitleBarProps {
  title: ReactNode;
  description?: ReactNode;
  rightSection?: ReactNode;
}

const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  ({ title, description, rightSection, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className="flex items-center justify-between my-md gap-8 xs:gap-4 flex-wrap"
      >
        <div>
          <Title order={2}>{title}</Title>
          {description && <Text size="sm" c="dimmed">{description}</Text>}
        </div>
        <div>{rightSection}</div>
      </div>
    );
  },
);

TitleBar.displayName = "TitleBar";

export { TitleBar };
