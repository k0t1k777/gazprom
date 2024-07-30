declare module "*.svg?react" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}