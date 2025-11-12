"use client";

import { CheckboxCardProps, Text, Checkbox, Group } from "@mantine/core";
import classes from "@/styles/checkboxCard.module.css";
import React from "react";

export interface CustomCheckboxCardProps extends CheckboxCardProps {
  label: string;
  description?: string;
  rightsection?: React.ReactNode
}

const CheckboxCard = React.forwardRef<
  HTMLButtonElement,
  CustomCheckboxCardProps
>((props, ref) => {
  return (
    <Checkbox.Card className={classes.root} ref={ref} {...props}>
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div className="w-full">
          <Group justify="space-between" className="w-full">
            <Text className={classes.label}>{props.label}</Text>
            {props.rightsection}
          </Group>
          {props.description && (
            <Text className={classes.description}>{props.description}</Text>
          )}
        </div>
      </Group>
    </Checkbox.Card>
  );
});

CheckboxCard.displayName = "CheckboxCard";

export { CheckboxCard };
