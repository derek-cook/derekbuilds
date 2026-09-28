import { useState, useEffect, useEffectEvent, type RefObject } from "react";

type Opts = {
  ref: RefObject<HTMLDivElement | null>;
  onKeydown?: () => void;
  onClose?: () => void;
};

export const useKeyCommand = ({ ref, onKeydown, onClose }: Opts) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const handleKeydown = useEffectEvent(() => onKeydown?.());
  const handleClose = useEffectEvent(() => onClose?.());

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "/") {
        setIsEnabled(true);
      } else if (key === "Escape") {
        // ESC is close key
        setIsEnabled(false);
        handleClose();
      }
      handleKeydown();
    };

    const clickListener = () => {
      setIsEnabled((prev) => !prev);
      handleClose();
    };

    const currRef = ref.current;

    if (currRef) {
      currRef.addEventListener("keydown", keyListener);
      currRef.addEventListener("click", clickListener);
      return () => {
        currRef.removeEventListener("keydown", keyListener);
        currRef.removeEventListener("click", clickListener);
      };
    }
  }, [ref]);

  return { isEnabled };
};
