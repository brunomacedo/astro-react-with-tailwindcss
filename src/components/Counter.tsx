import { useState, type JSX } from "react";
import { cn } from "../lib/utils";

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
        <button className="cursor-pointer" onClick={subtract}>
          -
        </button>
        <pre>{count}</pre>
        <button className="cursor-pointer" onClick={add}>
          +
        </button>
      </div>
      <div className="text-center">{children}</div>
    </main>
  );
}
