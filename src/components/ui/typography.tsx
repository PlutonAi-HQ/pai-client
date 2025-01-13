import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const H1 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h1">>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("font-sans text-h1 font-bold leading-none", className)}
    {...props}
  />
));
H1.displayName = "H1";

const H2 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h2">>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("font-sans text-h2 font-semibold leading-none", className)}
    {...props}
  />
));
H2.displayName = "H2";

const H3 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h3">>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-sans text-h3 font-medium leading-none", className)}
    {...props}
  />
));
H3.displayName = "H3";

const H4 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h4">>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("font-sans text-h4 font-medium leading-none", className)}
    {...props}
  />
));
H4.displayName = "H4";

const H5 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h5">>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-serif text-h5 font-bold leading-none", className)}
    {...props}
  />
));
H5.displayName = "H5";

const H6 = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<"h6">>(({ className, ...props }, ref) => (
  <h6
    ref={ref}
    className={cn("font-serif text-h6 font-bold leading-none", className)}
    {...props}
  />
));
H6.displayName = "H6";

const Paragraph = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<"p">>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-p font-bold leading-none", className)}
    {...props}
  />
));
Paragraph.displayName = "Paragraph";

const HyperLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<"a">>(
  ({ className, href = "", ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      className={cn("font-sans text-a font-bold leading-none underline", className)}
      {...props}
    />
  ),
);
HyperLink.displayName = "A";

const Strong = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<"strong">>(({ className, ...props }, ref) => (
  <strong
    ref={ref}
    className={cn("font-sans text-strong font-bold leading-none", className)}
    {...props}
  />
));
Strong.displayName = "Strong";

const Emphasis = forwardRef<HTMLElement, ComponentPropsWithoutRef<"em">>(({ className, ...props }, ref) => (
  <em
    ref={ref}
    className={cn("font-serif text-em font-bold italic leading-none", className)}
    {...props}
  />
));
Emphasis.displayName = "Emphasis";

const Small = forwardRef<HTMLElement, ComponentPropsWithoutRef<"small">>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn("font-sans text-small font-bold leading-none", className)}
    {...props}
  />
));
Small.displayName = "Small";

const Blockquote = forwardRef<HTMLQuoteElement, ComponentPropsWithoutRef<"blockquote">>(
  ({ className, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn("font-serif text-blockquote font-bold italic leading-none", className)}
      {...props}
    />
  ),
);
Blockquote.displayName = "Blockquote";

const Pre = forwardRef<HTMLPreElement, ComponentPropsWithoutRef<"pre">>(({ className, ...props }, ref) => (
  <pre
    ref={ref}
    className={cn("font-sans text-pre font-bold leading-none", className)}
    {...props}
  />
));
Pre.displayName = "Pre";

const Code = forwardRef<HTMLModElement, ComponentPropsWithoutRef<"code">>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn("font-mono text-code font-bold leading-none", className)}
    {...props}
  />
));
Code.displayName = "Code";

const Sub = forwardRef<HTMLElement, ComponentPropsWithoutRef<"sub">>(({ className, ...props }, ref) => (
  <sub
    ref={ref}
    className={cn("font-serif text-sub font-bold leading-none", className)}
    {...props}
  />
));
Sub.displayName = "Sub";

const Sup = forwardRef<HTMLModElement, ComponentPropsWithoutRef<"code">>(({ className, ...props }, ref) => (
  <sup
    ref={ref}
    className={cn("font-serif text-sup font-bold leading-none", className)}
    {...props}
  />
));
Sup.displayName = "Sup";

export { H1, H2, H3, H4, H5, H6, Paragraph, HyperLink, Strong, Emphasis, Small, Blockquote, Pre, Code, Sub, Sup };
