import { cn } from "@/lib/utils";
import React from "react";

type IconProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export default function Icon({
  icon: IconComponent,
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <IconComponent
      width={size}
      height={size}
      className={cn("inline-block", className)}
      {...props}
    />
  );
}
