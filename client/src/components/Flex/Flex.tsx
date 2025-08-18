import type { JSX } from "react";

import styles from "./Flex.module.css";

type Sizes =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

type Props = {
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: Sizes;
  padding?: Sizes;
  className?: string;
  [key: string]: any;
};

export const Flex: React.FC<Props> = ({
  children,
  tag = "div",
  align = "stretch",
  justify = "start",
  direction = "row",
  wrap = "nowrap",
  gap = "md",
  padding = "",
  className,
  ...props
}) => {
  const flexClass = [
    styles["flex"],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    styles[`direction-${direction}`],
    styles[`wrap-${wrap}`],
    styles[`gap-${gap}`],
    styles[`padding-${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = tag;

  return (
    <Tag className={flexClass} {...props}>
      {children}
    </Tag>
  );
};
