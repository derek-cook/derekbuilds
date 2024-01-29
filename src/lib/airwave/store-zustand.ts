/* eslint-disable */
import zCreate, { StateCreator, Mutate, StoreApi } from "zustand";
import type { ChannelClient } from "./client";

export type Middleware<S> = (
  config: StateCreator<S>,
  options: {
    client: ChannelClient;
  },
) => StateCreator<S>;

// declare module "zustand" {
//   interface StoreMutators<S, A> {
//     middleware: Write<Cast<S, object>, { middleware: A }>;
//   }
// }

type PopArgument<T extends (...a: never[]) => unknown> = T extends (
  ...a: [...infer A, infer _]
) => infer R
  ? (...a: A) => R
  : never;

type Write<T extends object, U extends object> = Omit<T, keyof U> & U;

type Cast<T, U> = T extends U ? T : U;

type ChannelMiddlewareImpl = <T extends unknown>(
  config: PopArgument<StateCreator<T, [], []>>,
  Options: {
    client: ChannelClient;
  },
) => PopArgument<StateCreator<T, [], []>>;

const joinListener = (e: MessageEvent, set: any) => {
  const message = JSON.parse(e.data);
  if (message.joined) {
    const clientId = message.joined;
    set((state: any) => ({
      others: {
        ...state.others,
        [clientId]: {},
      },
    }));
  }
};

const leaveListener = (e: MessageEvent, set: any) => {
  const message = JSON.parse(e.data);
  if (message.quit) {
    const clientId = message.quit;
    set((state: any) => {
      const newOthers = {
        ...state.others,
      };
      delete newOthers[clientId];
      return {
        others: {
          ...newOthers,
        },
      };
    });
  }
};

const messageListener = (e: MessageEvent, set: any, get: any) => {
  const data = JSON.parse(e.data).data;
  if (!get().others) set({ others: {} });
  if (!data) return;
  const clientId = data.clientId;
  if (!get().others[clientId]) {
    set((state: any) => ({
      others: {
        ...state.others,
        [clientId]: {},
      },
    }));
  }
  const otherState = data.data;
  const prevState = get().others[clientId] ?? {};
  set((state: any) => ({
    ...state,
    others: {
      ...state.others,
      [clientId]: {
        ...prevState,
        ...otherState,
      },
    },
  }));
};

export const create = zCreate;
const channelMiddleware: ChannelMiddlewareImpl = (config, { client }) => {
  return (set, get, _api) => {
    type T = ReturnType<typeof config>;
    type A = {
      client: ChannelClient;
    };

    const api = _api as Mutate<StoreApi<T>, [["config", A]]>;

    // set({ others: {} });
    client.eventListeners.add((e) => joinListener(e, set));
    client.eventListeners.add((e) => leaveListener(e, set));
    client.eventListeners.add((e) => messageListener(e, set, get));
    return config(
      (...args) => {
        set(...args);
        client.sendMessage({
          clientId: client.clientId,
          data: args[0],
        });
      },
      get,
      api,
    );
  };
};
export const middleware = channelMiddleware as unknown;
