import { EventNames } from "./events";

type GTMEvent = {
  event: EventNames;
  category?: string;
  action?: string;
  label?: string;
  value?: string | number;
};

export const pushDataLayer = (eventData: GTMEvent) => {
  if (typeof window === "undefined") return;

  const isDev =
    import.meta.env.MODE === "development" || location.hostname === "localhost";

  if (isDev) {
    console.log("[GTM EVENT]", eventData);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  }
};

export { EventNames as GTMEvents };
