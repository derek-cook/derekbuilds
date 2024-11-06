import { v4 as uuidv4 } from "uuid";
type ConnectionState = "INIT" | "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export class Connection {
  websocket: WebSocket;
  connectionId = uuidv4();
  listeners = new Set<(state: ConnectionState) => void>();
  state: ConnectionState = "INIT";

  constructor(channelId: string, clientId: string) {
    const wsProtocol =
      document.location.protocol === "http:" ? "ws://" : "wss://";
    // NOTE: To run durable objects worker locally, use wrangler cli and localhost:8787 as host.
    // For running locally on mobile, you must use the actual worker hostname, and the IP address for the browser URL.
    const host = "ws-durable-obj-demo.derekcook.workers.dev";
    this.websocket = new WebSocket(
      `${wsProtocol}${host}/api/websocket?channel=${channelId}`,
    );
    const ws = this.websocket;

    ws.addEventListener("open", () => {
      console.log("OPEN");
      ws.send(JSON.stringify({ clientId }));
      this.listeners.forEach((l) => l("OPEN"));
    });

    ws.addEventListener("close", () => {
      console.log("CLOSED");
      this.listeners.forEach((l) => l("CLOSED"));
    });
  }

  getStatus() {
    const ws = this.websocket;
    return (
      {
        [ws.CLOSED]: "CLOSED",
        [ws.CONNECTING]: "CONNECTING",
        [ws.OPEN]: "OPEN",
        [ws.CLOSING]: "CLOSING",
      }[ws.readyState] ?? ""
    );
  }

  on(type: ConnectionState, listener: () => void) {
    const stateListener = (state: ConnectionState) => {
      if (state === type) {
        listener();
      }
    };
    this.listeners.add(stateListener);
    return () => this.listeners.delete(stateListener);
  }

  close() {
    this.listeners.forEach((l) => l("CLOSING"));
    this.websocket.close();
  }
}
