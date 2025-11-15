import * as react from "react";

export type AuthEvent = {
  id: string;
  type: "login" | "logout";
  originTab: string;
  ts: number;
};
const BUS_KEY = "__auth_bus__";
// Cross-tab bus with BroadcastChannel + localStorage fallback
export function useCrossTabBus(onMessage: (m: AuthEvent) => void) {
  const channelRef = react.useRef<BroadcastChannel | null>(null);

  react.useEffect(() => {
    if (typeof window === "undefined") return;

    if ("BroadcastChannel" in window) {
      channelRef.current = new BroadcastChannel("auth");
      const ch = channelRef.current;
      ch.onmessage = (e) => {
        if (e?.data) onMessage(e.data as AuthEvent);
      };
      return () => ch.close();
    }

    // fallback
    const onStorage = (e: StorageEvent) => {
      if (e.key !== BUS_KEY || !e.newValue) return;
      try {
        const payload = JSON.parse(e.newValue) as AuthEvent;
        onMessage(payload);
      } catch {}
    };
    (window as Window).addEventListener("storage", onStorage);
    return () => (window as Window).removeEventListener("storage", onStorage);
  }, [onMessage]);

  const publish = (payload: AuthEvent) => {
    const ch = channelRef.current;
    if (ch) {
      ch.postMessage(payload);
    } else {
      localStorage.setItem(BUS_KEY, JSON.stringify(payload));
    }
  };

  return publish;
}
