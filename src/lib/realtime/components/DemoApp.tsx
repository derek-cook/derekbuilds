"use client";
import { generateUsername } from "unique-username-generator";
import { Realtime } from "../client/Realtime";

import { RealtimeProvider } from "../components/RealtimeProvider";

const channelClientA = new Realtime({
  apiKey: "cbc84c6df1f35f7e74ccc003d6d01f5b719120ecb7852a99405f11f22da2",
  clientId: generateUsername(),
});
const channelClientB = new Realtime({
  apiKey: "100bcca2f83cce99e265c187e633a1ebe79c2f9d46b1ca63e6b3d31b3563",
  clientId: generateUsername(),
});

type DemoAppProps = {
  children?: React.ReactNode;
};

export const DemoAppA: React.FC<DemoAppProps> = ({ children }) => {
  return (
    <div id="DemoAppA" className="h-full">
      <RealtimeProvider client={channelClientA}>{children}</RealtimeProvider>
    </div>
  );
};

export const DemoAppB: React.FC<DemoAppProps> = ({ children }) => {
  return (
    <div id="DemoAppB" className="h-full">
      <RealtimeProvider client={channelClientB}>{children}</RealtimeProvider>
    </div>
  );
};
