import { forwardRef, useEffect } from "react";

type HoverInputProps = {
  location: [number, number];
  onChange: (str: string) => void;
  isEnabled: boolean;
  value: string;
};

export const HoverInput = forwardRef<HTMLInputElement, HoverInputProps>(
  ({ value: value, onChange, location: [x, y], isEnabled }, ref) => {
    useEffect(() => {
      if (isEnabled) {
        onChange("");
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
        className="w-min rounded-xl rounded-tl-none bg-teal-400 px-4 py-2 text-black shadow-md"
        style={{
          position: "relative",
          top: y + 20,
          left: x + 10,
        }}
      >
        <input
          className="w-min bg-inherit p-0.5 outline-none placeholder:text-black"
          size={value?.length ? value.length + 1 : 12}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            console.log("FOCUS");
          }}
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
    );
  },
);

HoverInput.displayName = "HoverInput";
