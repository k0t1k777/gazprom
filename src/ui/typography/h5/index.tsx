import { FC, ReactNode } from "react";
import clsx from "clsx";

export const H5: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <h5 className={clsx("text-10", className)}>{children}</h5>;
};
