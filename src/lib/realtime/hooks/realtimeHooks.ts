import { useContext, useEffect, useEffectEvent, useMemo } from "react";
import { RealtimeContext } from "../components/RealtimeProvider";
import { type ChannelMessage } from "../client/Channel";

export const useChannel = (
  channelId: string,
  listener: (message: ChannelMessage) => void,
) => {
  const realtime = useContext(RealtimeContext);
  const channel = useMemo(
    () => realtime?.getChannel(channelId),
    [channelId, realtime],
  );
  const onMessage = useEffectEvent(listener);

  useEffect(() => {
    const channelListener = (msg: ChannelMessage) => onMessage(msg);
    const unsubscribe = channel?.subscribe(channelListener);
    return unsubscribe;
  }, [channel]);

  return channel;
};
