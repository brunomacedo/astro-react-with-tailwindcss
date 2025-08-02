import { useState, type JSX } from "react";
import { cn } from "../lib/utils";
import { GTMEvents, pushDataLayer } from "../lib/gtm/dataLayer";

export default function Counter({
  children,
  count: initialCount,
}: {
  children: JSX.Element;
  count: number;
}) {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <main>
      <div
        className={cn(
          `mt-6 grid grid-cols-3 place-items-center gap-4 text-2xl`,
        )}
      >
        <button
          className="cursor-pointer"
          onClick={() => {
            subtract();
            pushDataLayer({
              event: GTMEvents.AMAZON_CLICK,
              category: "subtract",
              label: "Minus",
            });
          }}
        >
          -
        </button>
        <pre>{count}</pre>
        <button
          className="cursor-pointer"
          onClick={() => {
            add();
            pushDataLayer({
              event: GTMEvents.AMAZON_CLICK,
              category: "add",
              label: "Plus",
            });
          }}
        >
          +
        </button>
      </div>
      <div className="text-center">{children}</div>
    </main>
  );
}
