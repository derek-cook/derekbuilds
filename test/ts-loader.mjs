import { stat } from "node:fs/promises";

/** @type {import("node:module").ResolveHook} */
export const resolve = async (specifier, context, nextResolve) => {
  if (specifier.startsWith(".") && !specifier.match(/\.[cm]?[jt]sx?$/)) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);
    try {
      await stat(candidate);
      return nextResolve(candidate.href, context);
    } catch {
      return nextResolve(specifier, context);
    }
  }

  return nextResolve(specifier, context);
};
