import { generateUsername } from "unique-username-generator";
import throttle from "lodash/throttle";

type ChannelEvent<T = unknown> = BoundEvent<T> | JoinEvent | LeaveEvent;

type BoundEvent<TData = unknown, TEvent = string> = {
  event: TEvent;
  clientId: string;
  data: TData;
};

type JoinEvent = BoundEvent<
  {
    img?: string;
  },
  "_join"
>;

type LeaveEvent = BoundEvent<never, "_leave">;

type BoundListener<TData> = (e: BoundEvent<TData>) => void;

export type MemberData = {
  clientId: string;
  img?: string;
};

export type ChannelOptions = {
  shouldConnect?: boolean;
  memberData?: MemberData;
};

export class Channel {
  channelId: string;
  clientId: string;
  websocket?: WebSocket;

  // Member Data
  memberMap = new Map<string, MemberData>();
  members: string[] = [];
  membersListeners = new Set<(members: string[]) => void>();
  // listeners for all message events
  messageListeners = new Set<(e: MessageEvent) => void>();
  // custom named event listeners
  eventListeners = new Map<string, Set<BoundListener<unknown>>>();

  constructor(channelId: string) {
    this.channelId = channelId;
    const userName = generateUsername("-", 0, 15)
      .split("-")
      .reverse()
      .join("-");
    this.clientId = userName;
  }

  isConnected() {
    return this.websocket?.readyState === this.websocket?.OPEN;
  }

  connect(channelName: string, opts: ChannelOptions = {}) {
    console.log("CONNECT");
    if (typeof document === "undefined") return;
    this.clientId = opts.memberData?.clientId ?? this.clientId;
    const wsProtocol =
      document.location.protocol === "http:" ? "ws://" : "wss://";
    // NOTE: localhost can't be changed to its ip address. This only affects the case of locally running the client on a mobile device. todo: fix this
    // use workers url to test on mobile device
    const host = "ws-durable-obj-demo.derekcook.workers.dev";
    // process.env.NODE_ENV === "development"
    //   ? "localhost:8787"
    //   : "ws-durable-obj-demo.derekcook.workers.dev";
    const ws = new WebSocket(
      `${wsProtocol}${host}/api/websocket?channel=${channelName}`,
    );
    this.messageListeners.forEach((l) => {
      ws.addEventListener("message", l);
    });
    // this.eventListeners.forEach((e, set) => {
    //   console.log("TRANSFERRING LISTENER", l);
    //   ws.addEventListener("message", l);
    // });

    const openListener = () => {
      // initial data after handshake
      console.log("OPEN LISTENER");
      ws.send(JSON.stringify(opts.memberData ?? { clientId: this.clientId }));
    };

    const messageListener = (e: MessageEvent) => {
      const data = JSON.parse(e.data as string) as ChannelEvent;
      if (data.event === "_join") {
        this.memberMap.set(data.clientId, data.data as MemberData);
        this.publishMembers();
      } else if (data.event === "_leave") {
        this.memberMap.delete(data.clientId);
        this.publishMembers();
      } else {
        this.eventListeners.get(data.event)?.forEach((l) => l(data));
      }

      this.messageListeners.forEach((l) => l(e));
    };

    const closeListener = (e: CloseEvent) => {
      console.log("CLOSE LISTENER");
      // this.websocket?.send(
      //   JSON.stringify({ event: "_leave", clientId: this.clientId })
      // );
    };

    ws.addEventListener("open", openListener);
    ws.addEventListener("message", messageListener);
    ws.addEventListener("close", closeListener);

    this.websocket = ws;
    return () => {
      this.messageListeners.forEach((l) =>
        ws.removeEventListener("message", l),
      );
      ws.removeEventListener("open", openListener);
      ws.removeEventListener("message", messageListener);
      ws.close();
      ws.removeEventListener("close", closeListener);
    };
  }

  disconnect() {
    console.log("DISCONNECT");
    this.websocket?.close();
  }

  publishMembers() {
    const updatedMembers: string[] = [];
    this.memberMap.forEach((v, k, m) => updatedMembers.push(k));
    this.members = updatedMembers;
    this.membersListeners.forEach((l) => l(this.members));
  }

  subscribeToMembers = (listener: (members: string[]) => void) => {
    this.membersListeners.add(listener);
    return () => this.membersListeners.delete(listener);
  };

  // subscribe/bind/listen to custom event name
  /**
   *
   * NOTES
   *
   *
   * Be careful, passing the channel and extracting a method (ie, bind, trigger)
   * in the useChannel hook will fail if the method is not an arrow function.
   *
   * The reason is because standard `function() {}` syntax will lose `this` context
   * if you separate the method from its caller
   *
   * example
   *
   * class Channel {
   *  trigger() {
   *    ...
   *  }
   * }
   *
   * const { trigger } = channel;
   * trigger(); // Error: `this` is is undefined
   *
   *
   *
   */
  bind = <TData>(event: string, listener: BoundListener<TData>) => {
    const listenerSet = this.eventListeners.get(event) as Set<
      BoundListener<TData>
    >;
    if (listenerSet) {
      listenerSet.add(listener);
      return () => listenerSet.delete(listener);
    } else {
      this.eventListeners.set(
        event,
        new Set<BoundListener<unknown>>().add(
          listener as BoundListener<unknown>,
        ),
      );
      return () => {
        this.eventListeners
          .get(event)
          ?.delete(listener as BoundListener<unknown>);
      };
    }
  };

  // publish/trigger/emit event by name
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  trigger = throttle(
    (event: string, data: unknown) => {
      if (this.getStatus() === "OPEN") {
        this.websocket?.send(
          JSON.stringify({
            clientId: this.clientId,
            event,
            data,
          }),
        );
      }
    },
    80,
    { leading: true },
  ) as (event: string, data: unknown) => void;

  getStatus() {
    const ws = this.websocket;
    if (!ws) return "NO_WS";
    return (
      {
        [ws.CLOSED]: "CLOSED",
        [ws.CONNECTING]: "CONNECTING",
        [ws.OPEN]: "OPEN",
        [ws.CLOSING]: "CLOSING",
      }[ws.readyState] ?? ""
    );
  }
}
