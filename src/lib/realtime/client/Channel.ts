import throttle from "lodash/throttle";
import { Connection } from "./Connection";

export type ChannelMessage = {
  event: string;
  clientId: string;
  data?: unknown;
};

export type MemberData = {
  clientId: string;
  data?: unknown;
  img?: string;
};

export class Channel {
  channelId: string;
  clientId: string;
  connection?: Connection;
  listeners = new Set<(message: ChannelMessage) => void>();
  members: MemberData[] = [];
  memberMap = new Map<string, MemberData>();
  heartbeat = 1;
  heartbeatIntv = setInterval(() => {
    this.trigger("_heartbeat");
  }, 1000);
  reconnectIntv = setInterval(() => {
    if (!this.heartbeat) {
      this.connect();
      this.heartbeat = 5;
    }
    this.heartbeat--;
  }, 1000);

  constructor(channelId: string, clientId: string) {
    this.channelId = channelId;
    this.clientId = clientId;
    this.connect();
  }

  connect() {
    this.connection = new Connection(this.channelId, this.clientId);
    this.connection.websocket.addEventListener("message", (e: MessageEvent) => {
      this.heartbeat = 1;
      const channelMessage = JSON.parse(e.data as string) as ChannelMessage;
      if (channelMessage.event === "_join") {
        this.memberMap.set(
          channelMessage.clientId,
          channelMessage.data as MemberData,
        );
        this.members = [...this.memberMap.values()];
      } else if (channelMessage.event === "_leave") {
        this.memberMap.delete(channelMessage.clientId);
        this.members = [...this.memberMap.values()];
      }
      this.listeners.forEach((l) => l(channelMessage));
    });
  }

  disconnect() {
    this.connection?.websocket.send(
      JSON.stringify({
        event: "_leave",
        clientId: this.clientId,
      }),
    );
    clearInterval(this.heartbeatIntv);
    clearInterval(this.reconnectIntv);
    this.connection?.close();
  }

  subscribe(listener: (e: ChannelMessage) => void) {
    const messageListener = (message: ChannelMessage) => {
      listener(message);
    };
    this.listeners.add(messageListener);
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.disconnect();
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  trigger = throttle(
    (event: string, data?: unknown) => {
      if (this.connection?.getStatus() === "OPEN") {
        const message: ChannelMessage = {
          clientId: this.clientId,
          event,
          data,
        };
        this.connection?.websocket.send(JSON.stringify(message));
      } else {
        console.error("Cannot trigger, websocket not open");
      }
    },
    80,
    { leading: true },
  );
}
