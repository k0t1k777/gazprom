import { FC, ReactNode } from "react";
import clsx from "clsx";

export const H3: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <h3 className={clsx("text-16", className)}>{children}</h3>;
};
