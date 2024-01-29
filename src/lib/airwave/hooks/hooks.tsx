"use client";
import { type Channel, type ChannelClient } from "../client";
import type { MemberData } from "../client";
import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useMemo,
} from "react";

const ChannelClientContext = createContext<ChannelClient | null>(null);

export const ChannelClientProvider = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: ChannelClient;
}) => {
  return (
    <ChannelClientContext.Provider value={client}>
      {children}
    </ChannelClientContext.Provider>
  );
};

export function useChannel(channelId: string): Channel {
  const channelClient = useContext(ChannelClientContext);
  if (!channelClient) {
    throw new Error(
      "No ChannelClient found. You must create a ChannelClient at the provider level.",
    );
  }
  const channel = channelClient.join(channelId, {
    memberData: {
      clientId: channelClient.clientId,
    },
  });
  // const channelRef = useRef(channelClient.join(channelId));
  return channel;
}

export function useMembers(channelId: string): MemberData[] {
  const channel = useChannel(channelId);
  const snapshot = useMemo(() => channel.members, [channel]);
  const members = useSyncExternalStore(
    channel.subscribeToMembers,
    () => {
      return channel.members;
    },
    () => snapshot,
  );

  const memberData: MemberData[] = useMemo(
    () => members.map((id) => channel.memberMap.get(id)!),
    [members, channel.memberMap],
  );
  return memberData;
}
