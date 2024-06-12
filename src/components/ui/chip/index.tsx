import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils/cn";

const ChipVariants = cva(
    "rounded-full w-min whitespace-nowrap uppercase text-xs sm:text-sm font-semibold",
    {
        variants: {
            variant: {
                default: "bg-primary/20 text-primary",
            },
            size: {
                default: "px-3 py-1 ",
                sm: "h-9 rounded-full px-3",
                lg: "h-12 rounded-full text-base px-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ChipProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof ChipVariants> {
    asChild?: boolean;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
    (
        { className, children, variant, size, asChild = false, ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : "div";
        return (
            <Comp
                className={cn(ChipVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </Comp>
        );
    },
);
Chip.displayName = "Chip";

export { Chip, ChipVariants };
