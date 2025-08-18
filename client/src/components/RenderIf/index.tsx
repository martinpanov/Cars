type Props = {
  children: React.ReactNode;
  condition: any;
};

export const RenderIf: React.FC<Props> = ({ children, condition }) => {
  if (!condition) {
    return null;
  }

  return children;
};
