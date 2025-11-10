import { Breadcrumbs as CoreBreadcrumbs, Text, Divider } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export interface BreadcrumbsItem {
  title: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
}

const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ items, ...props }, ref) => {
    return (
      <div>
        <CoreBreadcrumbs
          {...props}
          ref={ref}
          separator={<IconChevronRight className="text-gray-600" size={16} />}
          separatorMargin="xs"
          className="p-xs text-gray-600"
        >
          {items.map((item, index) => {
            if (item.href) {
              return (
                <Text
                  size="sm"
                  className="hover:text-primary"
                  component={Link}
                  href={item.href}
                  key={index}
                >
                  {item.title}
                </Text>
              );
            }
            return (
              <Text size="sm" key={index}>
                {item.title}
              </Text>
            );
          })}
        </CoreBreadcrumbs>
        <Divider />
      </div>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
