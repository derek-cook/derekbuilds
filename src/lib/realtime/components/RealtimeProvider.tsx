import { createContext } from "react";
import { type Realtime } from "../client/Realtime";

export const RealtimeContext = createContext<Realtime | null>(null);

export const RealtimeProvider = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Realtime;
}) => {
  return (
    <RealtimeContext.Provider value={client}>
      {children}
    </RealtimeContext.Provider>
  );
};
