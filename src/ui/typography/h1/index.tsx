import { FC, ReactNode } from "react";
import clsx from "clsx";

export const H1: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <h1 className={clsx("text-24 leading-none", className)}>{children}</h1>;
};
