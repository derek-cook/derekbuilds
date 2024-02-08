import { useContext, useEffect, useRef, useState } from "react";
import { Realtime } from "../client/Realtime";
import { RealtimeContext } from "../components/RealtimeProvider";
import { type ChannelMessage } from "../client/Channel";

export const useRealtime = (apiKey: string, clientId: string) => {
  const [realtime, setRealtime] = useState<Realtime | null>(null);
  useEffect(() => {
    const realtimeInstance = new Realtime({ apiKey, clientId });
    setRealtime(realtimeInstance);
    return () => {
      realtimeInstance.channels.forEach((channel) => {
        channel.connection?.websocket.close();
      });
    };
  }, [apiKey, clientId]);
  return realtime;
};

export const useChannel = (
  channelId: string,
  listener: (message: ChannelMessage) => void,
) => {
  const realtime = useContext(RealtimeContext);
  const channel = realtime?.getChannel(channelId);
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    const channelListener = (msg: ChannelMessage) => listenerRef.current(msg);
    const unsubscribe = channel?.subscribe(channelListener);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [channel, channelId, realtime]);

  return channel;
};
