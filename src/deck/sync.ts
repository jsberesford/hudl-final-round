/** Same-origin sync between the audience deck and the presenter window. */
export type SyncMsg = { type: "at"; id: string } | { type: "go"; id: string } | { type: "hello" };

export const channel: BroadcastChannel | null =
  typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("hacklanta-deck");
