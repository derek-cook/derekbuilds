"use client";
import Ably from "ably";
import { AblyProvider } from "ably/react";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ablyClient = new Ably.Realtime.Promise({ authUrl: "/api/ably" });
  return <AblyProvider client={ablyClient}>{children}</AblyProvider>;
};
