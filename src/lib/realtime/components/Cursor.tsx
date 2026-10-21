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
      className="pointer-events-none h-4 w-4 bg-[url('/cursor-default.png')] bg-contain bg-no-repeat transition-all duration-150 motion-reduce:transition-none"
    >
      <div className="relative left-4 w-max">
        {text && (
          <MessageBubble
            isOwn={false}
            className="m-0 rounded-lg rounded-tl-none bg-gray-400 bg-opacity-100 text-xs text-black"
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
