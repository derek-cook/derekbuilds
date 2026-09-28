import { MessageBubble } from "~/components/MessageBubble";

type CursorProps = {
  location?: [number, number];
  children?: React.ReactNode;
  text?: string;
};
const Cursor: React.FC<CursorProps> = ({ location, children, text }) => {
  return location ? (
    <div
      style={{
        position: "absolute",
        top: `${location[1]}px`,
        left: `${location[0]}px`,
      }}
      className="linear sage-other-cursor pointer-events-none transition-all duration-150"
    >
      <div className="relative left-4 w-max">
        {text && (
          <MessageBubble
            isOwn={false}
            className="m-0 rounded-lg rounded-tl-none text-xs"
          >
            {text}
          </MessageBubble>
        )}
        {children}
      </div>
    </div>
  ) : null;
};

export default Cursor;
