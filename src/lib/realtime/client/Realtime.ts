import { Channel } from "./Channel";

type ClientOptions = {
  clientId: string;
};

export const getRealtime = (opts: ClientOptions) => new Realtime(opts);

export class Realtime {
  channels = new Map<string, Channel>();
  clientId: string;

  constructor(opts: ClientOptions) {
    this.clientId = opts.clientId;
  }

  getChannel(channelId: string) {
    if (typeof document === "undefined") {
      throw new Error("Realtime client is only meant to be used in the browser");
    }
    if (this.channels.get(channelId)) {
      return this.channels.get(channelId);
    }
    const channel = new Channel(channelId, this.clientId, () => {
      this.channels.delete(channelId);
    });
    this.channels.set(channelId, channel);
    return channel;
  }
}
