import { FC, ReactNode } from "react";
import clsx from "clsx";

export const H2: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <h2 className={clsx("text-18 leading-5", className)}>{children}</h2>;
};
