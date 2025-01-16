import { FC, ReactNode } from "react";
import clsx from "clsx";

export const T1: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <p className={clsx("text-16 leading-1.1", className)}>{children}</p>;
};
