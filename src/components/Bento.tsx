import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const itemVariants = cva("", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "col-span-2 row-span-1 ",
      square: "aspect-square col-span-1",
      lg: "",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface BentoItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  size: "xs" | "sm" | "md" | "lg" | "square";
}

export const BentoItem = ({ children, className, size }: BentoItemProps) => {
  return (
    <div className={cn(itemVariants({ size, className }))}>{children}</div>
  );
};

type BentoContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const BentoContainer = ({
  children,
  className,
}: BentoContainerProps) => {
  return (
    <div
      className={cn(
        "grid  grid-cols-2 gap-4 gap-y-6 sm:grid-cols-4 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
