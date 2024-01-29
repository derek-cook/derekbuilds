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
      }}
      className="linear sage-other-cursor pointer-events-none transition-all duration-150"
    >
      <div className="relative left-4 w-max">
        <p className="py-1 text-xs text-gray-400">{label}</p>
        {children}
      </div>
    </div>
  ) : null;
};

export default Cursor;
