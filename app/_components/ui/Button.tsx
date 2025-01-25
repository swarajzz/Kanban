import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  [
    "leading-none",
    "flex",
    "gap-2",
    "items-center",
    "justify-center",
    "focus: outline-none",
    "focus-visible::ring-4",
    "transition-all",
    "rouded-lg",
    "ring-theme-300",
    "disabled:cursor-not-allowed",
    "disabled:bg-accent-100",
    "rounded-full",
    "font-bold",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-accent-200",
          "text-white",
          "border-transparent",
          "hover:bg-accent-100",
        ],
        secondary: [
          "dark:bg-white bg-accent-201",
          "text-accent-200",
          "",
          // "border-gray-400",
          // "hover:bg-gray-100",
        ],
        destructive: [
          "bg-accent-400",
          "text-white",
          "border-gray-400",
          "hover:bg-accent-300",
        ],
      },
      size: {
        sm: ["text-sm", "py-1", "min-h-9", "px-3"],
        md: ["text-xs", "py-4", "min-h-9", "px-10"],
        lg: ["text-md", "py-2", "px-4", "min-h-11", "px-5"],
      },
    },
    compoundVariants: [{ intent: "primary", size: "md" }],
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => <button className={button({ intent, size, className })} {...props} />;
