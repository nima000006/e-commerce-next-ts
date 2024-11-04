import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

const BoxLine: FC<Props> = ({ className, children }) => {
  return (
    <div className={className}>
      <p>{children}</p>
    </div>
  );
};

export default BoxLine;
