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
    channel.triggerThrottled("pointermove", [10, 20]);
    channel.trigger("onmessage", "hello");

    assert.deepEqual(
      socket.sent.map(({ event }) => event),
      ["pointermove", "onmessage"],
    );
  } finally {
    channel.disconnect();
  }
});

test("sends the first cursor position immediately", (t) => {
  t.mock.timers.enable({ apis: ["Date", "setTimeout", "setInterval"], now: 0 });
  const channel = new Channel("leading-cursor-test", "moving-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    channel.triggerThrottled("pointermove", [10, 20]);
    assert.deepEqual(
      socket.sent.map(({ data }) => data),
      [[10, 20]],
    );
  } finally {
    channel.disconnect();
  }
});

test("delivers the latest cursor position after a burst stops", (t) => {
  t.mock.timers.enable({
    apis: ["Date", "setTimeout", "setInterval"],
    now: 1000,
  });
  const channel = new Channel("trailing-cursor-test", "moving-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    channel.triggerThrottled("pointermove", [10, 20]);
    t.mock.timers.tick(20);
    channel.triggerThrottled("pointermove", [30, 40]);
    t.mock.timers.tick(20);
    channel.triggerThrottled("pointermove", [50, 60]);
    t.mock.timers.tick(39);
    assert.deepEqual(
      socket.sent.map(({ data }) => data),
      [[10, 20]],
    );
    t.mock.timers.tick(1);
    assert.deepEqual(
      socket.sent.map(({ data }) => data),
      [
        [10, 20],
        [50, 60],
      ],
    );
    t.mock.timers.tick(80);
    assert.equal(socket.sent.length, 2, "must not repeat the last position");
  } finally {
    channel.disconnect();
  }
});

test("keeps sending the latest position during sustained movement", (t) => {
  t.mock.timers.enable({
    apis: ["Date", "setTimeout", "setInterval"],
    now: 1000,
  });
  const channel = new Channel("continuous-cursor-test", "moving-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    for (let x = 0; x <= 190; x += 10) {
      channel.triggerThrottled("pointermove", [x, x]);
      t.mock.timers.tick(10);
    }
    t.mock.timers.tick(40);
    assert.deepEqual(
      socket.sent.map(({ data }) => data),
      [
        [0, 0],
        [70, 70],
        [150, 150],
        [190, 190],
      ],
    );
  } finally {
    channel.disconnect();
  }
});

test("cancels a pending cursor update when the channel disconnects", (t) => {
  t.mock.timers.enable({
    apis: ["Date", "setTimeout", "setInterval"],
    now: 1000,
  });
  const channel = new Channel("cancel-cursor-test", "moving-client");
  const socket = sockets.at(-1);
  assert.ok(socket);

  try {
    channel.triggerThrottled("pointermove", [10, 20]);
    t.mock.timers.tick(20);
    channel.triggerThrottled("pointermove", [30, 40]);
    const sentBeforeDisconnect = socket.sent.length;
    channel.disconnect();
    // Even if a new connection is opened, no stale position should be sent.
    channel.connect();
    const reconnectedSocket = sockets.at(-1);
    assert.ok(reconnectedSocket);
    t.mock.timers.tick(80);
    assert.equal(socket.sent.length, sentBeforeDisconnect + 1); // _leave
    assert.equal(reconnectedSocket.sent.length, 0);
  } finally {
    channel.disconnect();
  }
});
