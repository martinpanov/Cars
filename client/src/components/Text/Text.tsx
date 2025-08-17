import styles from "./Text.module.css";

type Props = {
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  size?: "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "light" | "regular" | "medium" | "bold";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "black";
  textAlign?: "left" | "center" | "right" | "justify";
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
};

export const Text: React.FC<Props> = ({
  tag = "p",
  size = "base",
  weight = "regular",
  textAlign = "left",
  color = "primary",
  className,
  children,
  ...props
}) => {
  const Tag = tag;
  const classNames = [
    styles[`text-${size}`],
    styles[`text-${weight}`],
    styles[`text-${color}`],
    styles[`text-align-${textAlign}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
};
