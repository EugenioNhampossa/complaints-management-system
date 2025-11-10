import React from "react";
import Image from "next/image";
import { Title } from "@mantine/core";

export interface EmptyStateProps extends React.ComponentPropsWithoutRef<"div"> {
  message?: React.ReactNode;
  variant?: "empty-list" | "empty-notification" | "success";
  title?: string;
  width?: number;
  height?: number;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      message,
      title,
      action,
      width = 200,
      height = 60,
      variant = "empty-list",
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className="w-full h-full mb-4 flex flex-col items-center gap-4 justify-center"
      >
        {title && <Title order={4}>{title}</Title>}
        <Image
          height={height}
          width={width}
          src={`/${variant}.svg`}
          alt={`${variant}`}
        />
        {message && (
          <div className="text-stone-400 text-sm text-center">{message}</div>
        )}
        {action && action}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
