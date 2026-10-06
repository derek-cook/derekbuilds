import assert from "node:assert/strict";
import { test } from "node:test";

type SentMessage = {
  event: string;
  data?: unknown;
};

const sockets: FakeWebSocket[] = [];

class FakeWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;

  readonly CONNECTING = FakeWebSocket.CONNECTING;
  readonly OPEN = FakeWebSocket.OPEN;
  readonly CLOSING = FakeWebSocket.CLOSING;
  readonly CLOSED = FakeWebSocket.CLOSED;
  readonly sent: SentMessage[] = [];
  readyState = FakeWebSocket.OPEN;

  constructor(url: string) {
    void url;
    sockets.push(this);
  }

  addEventListener(type: string, listener: (event: Event) => void) {
    void type;
    void listener;
  }

  send(message: string) {
    this.sent.push(JSON.parse(message) as SentMessage);
  }

  close() {
    this.readyState = FakeWebSocket.CLOSED;
  }
}

Object.assign(globalThis, { WebSocket: FakeWebSocket });

const { Channel } = await import("../../src/lib/realtime/client/Channel.ts");

test("sends every rapid chat update", () => {
  const channel = new Channel("chat-test", "typing-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    for (const value of ["h", "he", "hel", "hell", "hello"]) {
      channel.trigger("onmessage", value);
    }

    assert.deepEqual(
      socket.sent
        .filter(({ event }) => event === "onmessage")
        .map(({ data }) => data),
      ["h", "he", "hel", "hell", "hello"],
    );
  } finally {
    channel.disconnect();
  }
});

test("does not let pointer traffic suppress a chat update", () => {
  const channel = new Channel("mixed-events-test", "typing-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    channel.trigger("pointermove", [10, 20]);
    channel.trigger("onmessage", "hello");

    assert.deepEqual(
      socket.sent.map(({ event }) => event),
      ["pointermove", "onmessage"],
    );
  } finally {
    channel.disconnect();
  }
});
