type CursorProps = {
  label: string;
  location?: [number, number];
  children?: React.ReactNode;
};
const Cursor: React.FC<CursorProps> = ({ label, location, children }) => {
  return location ? (
    <div
      style={{
        position: "absolute",
        top: `${location[1]}px`,
        left: `${location[0]}px`,
        // borderLeft: "4px solid black",
        // borderTop: "4px solid black",
        // borderRight: "4px solid transparent",
        // borderBottom: "4px solid transparent",
        // transition: "all 10ms cubic-bezier(0.000, 0.620, 0.515, 1.225)  0s",
      }}
      className="linear sage-other-cursor pointer-events-none transition-all duration-150"
    >
      {/* <div className="w-2 h-2 bg-black"></div> */}
      <div className="relative left-4 w-max">
        <p className="py-1 text-xs text-gray-400">{label}</p>
        {children}
      </div>
    </div>
  ) : null;
};

export default Cursor;
