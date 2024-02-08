import { useState, useEffect, type RefObject } from "react";

type Opts = {
  ref: RefObject<HTMLDivElement>;
  onKeydown?: () => void;
  onClose?: () => void;
};

export const useKeyCommand = ({ ref, onKeydown, onClose }: Opts) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      const { key } = e;
      console.log({ key });
      if (key === "/") {
        setIsEnabled(true);
      } else if (key === "Escape") {
        // ESC is close key
        setIsEnabled(false);
        onClose?.();
      }
      onKeydown?.();
    };

    const clickListener = (e: MouseEvent) => {
      console.log("CLICKED");
      setIsEnabled((prev) => !prev);
      onClose?.();
    };

    const currRef = ref.current;

    if (currRef) {
      currRef.addEventListener("keydown", keyListener);
      currRef.addEventListener("click", clickListener);
      // currRef.addEventListener("", clickListener);

      return () => {
        // ref.current?.removeEventListener('keydown', keyListener);
        currRef.removeEventListener("keydown", keyListener);
        currRef.removeEventListener("click", clickListener);
      };
    }
  }, [ref]);

  return { isEnabled };
};
