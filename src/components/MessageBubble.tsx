import React from "react";
import { cn } from "~/lib/utils";

interface MessageBubbleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  isOwn: boolean;
}

export const MessageBubble = ({
  isOwn,
  children,
  ...props
}: MessageBubbleProps) => {
  // const circleStyle = "flex aspect-square w-fit max-w-xs items-center rounded-full bg-opacity-40 p-8 text-center"
  const style = isOwn
    ? "ml-8 bg-blue-500 rounded-br-none self-end"
    : "mr-8 bg-slate-500 rounded-bl-none self-start";
  return (
    <p
      className={cn(
        "flex w-fit max-w-xs items-center rounded-xl bg-opacity-50 p-4",
        style,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
