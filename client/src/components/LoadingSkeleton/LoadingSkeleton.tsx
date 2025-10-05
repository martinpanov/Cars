import styles from "./LoadingSkeleton.module.css";

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`${styles["loading-skeleton"]} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};
