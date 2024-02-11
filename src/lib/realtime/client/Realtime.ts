import { Channel } from "./Channel";

type ClientOptions = {
  apiKey: string;
  clientId: string;
  auth?: {
    endpoint: string;
    params?: Record<string, string>;
    headers?: Record<string, string>;
  };
};

export const getRealtime = (opts: ClientOptions) => new Realtime(opts);

export class Realtime {
  channels = new Map<string, Channel>();
  apiKey: string;
  clientId: string;

  constructor(opts: ClientOptions) {
    // check apiKey, auth, etc
    this.apiKey = opts.apiKey;
    this.clientId = opts.clientId;
  }

  getChannel(channelId: string) {
    if (!document) {
      console.error("Realtime client is only meant to be used in the browser");
    }
    if (this.channels.get(channelId)) {
      return this.channels.get(channelId);
    }
    const channel = new Channel(channelId, this.clientId);
    this.channels.set(channelId, channel);
    return channel;
  }
}
