"use client";
import { generateUsername } from "unique-username-generator";
import { Realtime } from "../client/Realtime";

import { RealtimeProvider } from "../components/RealtimeProvider";

const channelClientA = new Realtime({
  clientId: generateUsername(),
});
const channelClientB = new Realtime({
  clientId: generateUsername(),
});

type DemoAppProps = {
  children?: React.ReactNode;
};

export const DemoAppA: React.FC<DemoAppProps> = ({ children }) => {
  return (
    <div id="DemoAppA" className="h-full w-full">
      <RealtimeProvider client={channelClientA}>{children}</RealtimeProvider>
    </div>
  );
};

export const DemoAppB: React.FC<DemoAppProps> = ({ children }) => {
  return (
    <div id="DemoAppB" className="h-full w-full">
      <RealtimeProvider client={channelClientB}>{children}</RealtimeProvider>
    </div>
  );
};
