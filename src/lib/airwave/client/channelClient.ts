/* eslint-disable @typescript-eslint/no-explicit-any */
import { Channel } from "./channel";
import type { ChannelOptions } from "./channel";

type ClientOptions = {
  apiKey: string;
  clientId: string;
  auth?: {
    endpoint: string;
    params?: Record<string, any>;
    headers?: Record<string, any>;
    customHandler?: any;
  };
};

export class ChannelClient {
  channels = new Map<string, Channel>();
  apiKey: string;
  clientId: string;
  // global listeners triggered for all channels
  listeners = new Set<(e: MessageEvent) => void>();

  constructor(opts: ClientOptions) {
    // check apiKey, auth, etc
    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
  }

  join(channelId: string, opts?: ChannelOptions): Channel {
    if (this.channels.get(channelId)) {
      return this.channels.get(channelId)!;
    }

    const channel = new Channel(channelId);
    channel.connect(channelId, opts);
    this.channels.set(channelId, channel);
    return channel;
  }

  leave(channelId: string) {
    this.channels.get(channelId)?.disconnect();
    this.channels.delete(channelId);
  }
}
