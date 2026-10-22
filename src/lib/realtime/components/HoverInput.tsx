import { forwardRef, useEffect, useEffectEvent } from "react";

type HoverInputProps = {
  location: [number, number];
  onChange: (str: string) => void;
  isEnabled: boolean;
  value: string;
};

export const HoverInput = forwardRef<HTMLInputElement, HoverInputProps>(
  ({ value: value, onChange, location: [x, y], isEnabled }, ref) => {
    const resetValue = useEffectEvent(() => onChange(""));

    useEffect(() => {
      if (isEnabled) {
        resetValue();
      }
    }, [isEnabled]);

    const handleChange = (value: string) => {
      if (value !== "/") {
        // handle message push async
        onChange(value);
      }
    };

    return !isEnabled ? null : (
      <div
        className="absolute w-max max-w-[min(14rem,calc(100%-1rem))] rounded-xl rounded-tl-none bg-accent px-4 py-2 font-bold text-black shadow-md"
        style={{
          top: y + 20,
          left: x + 10,
        }}
      >
        <div className="relative min-w-0">
          <span
            aria-hidden="true"
            className="invisible block overflow-hidden whitespace-pre p-0.5"
          >
            {value || "say something"}
          </span>
          <input
            className="absolute inset-0 block w-full min-w-0 bg-inherit p-0.5 outline-none placeholder:text-black"
            aria-label="Cursor chat message"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onChange("");
              }
            }}
            placeholder="say something"
            ref={ref}
            autoFocus
          />
        </div>
      </div>
    );
  },
);

HoverInput.displayName = "HoverInput";
