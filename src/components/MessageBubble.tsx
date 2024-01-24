import React from "react";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  isOwn: boolean;
}

export const MessageBubble = ({
  isOwn,
  children,
  ...props
}: MessageBubbleProps) => {
  // const circleStyle = "flex aspect-square w-fit max-w-xs items-center rounded-full bg-opacity-40 p-8 text-center"
  const style = isOwn
    ? "ml-12 bg-zinc-950 rounded-br-none self-end"
    : "mr-12 bg-slate-500 rounded-bl-none self-start";
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{ duration: 0.1 }}
      className={cn(
        "mt-3 w-fit max-w-xs rounded-xl bg-opacity-50 px-4 py-2 text-sm",
        style,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
