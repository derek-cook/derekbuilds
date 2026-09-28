"use client";
import Ably from "ably";
import { AblyProvider } from "ably/react";
import { useEffect, useState } from "react";

const AblyClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [ablyClient] = useState(
    () => new Ably.Realtime.Promise({ authUrl: "/api/ably" }),
  );

  useEffect(() => () => ablyClient.close(), [ablyClient]);

  return <AblyProvider client={ablyClient}>{children}</AblyProvider>;
};

export default AblyClientProvider;
