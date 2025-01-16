import { FC, ReactNode } from "react";
import clsx from "clsx";

export const H4: FC<{
  className?: string
  children: ReactNode
}> = ({ children, className }) => {
  return <h4 className={clsx("text-12", className)}>{children}</h4>;
};
