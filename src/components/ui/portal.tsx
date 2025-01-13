import { cn } from "@/lib/utils";
import * as PortalPrimitive from "@radix-ui/react-portal";
import React from "react";

const Portal = React.forwardRef<
  React.ElementRef<typeof PortalPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PortalPrimitive.Root>
>(({ className, ...props }, ref) => (
  <PortalPrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
Portal.displayName = PortalPrimitive.Root.displayName;

export { Portal };
