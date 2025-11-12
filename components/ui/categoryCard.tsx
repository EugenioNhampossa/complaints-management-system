"use client";

import { Text, Group, Paper, PaperProps, UnstyledButton } from "@mantine/core";
import classes from "@/styles/checkboxCard.module.css";
import React from "react";

export interface CategoryCardProps extends PaperProps {
  label: string;
  description?: string | React.ReactNode;
  rightsection?: React.ReactNode;
  onClick?: () => void;
}

const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (props, ref) => {
    return (
      <UnstyledButton onClick={props.onClick}>
        <Paper
          className="hover-paper shadow-none p-xs hover:cursor-pointer cusrsor-pointer bg-stone-50 hover:bg-stone-700/8 transition-colors duration-200"
          ref={ref}
          {...props}
        >
          <Group wrap="nowrap" align="flex-start">
            <div className="w-full">
              <Group justify="space-between" className="w-full">
                <Text className={classes.label}>{props.label}</Text>
                {props.rightsection}
              </Group>
              {React.isValidElement(props.description) ? (
                props.description
              ) : (
                <div className="line-clamp-1">
                  <Text className={classes.description}>
                    {props.description}
                  </Text>
                </div>
              )}
            </div>
          </Group>
        </Paper>
      </UnstyledButton>
    );
  }
);

CategoryCard.displayName = "CategoryCard";

export { CategoryCard };
