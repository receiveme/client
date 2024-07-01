import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils/cn";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white hover:bg-primary/90 rounded-full before:block before:bg-white before:absolute relative before:h-0 before:w-0 hover:before:h-[300px] hover:before:w-[300px] overflow-hidden before:duration-500 before:transition-all hover:text-black transition-[color] duration-500 border-2 border-primary before:rounded-full",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-gray-200 text-black hover:bg-gray-200/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-full px-3",
                lg: "h-12 rounded-full text-base px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    wrapperClassname?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            children,
            variant,
            size,
            asChild = false,
            wrapperClassname,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size }),
                    wrapperClassname,
                )}
                ref={ref}
                {...props}
            >
                <span className={cn("relative z-10", className)}>
                    {children}
                </span>
            </Comp>
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
