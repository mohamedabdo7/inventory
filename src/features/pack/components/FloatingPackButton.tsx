// src/features/pack/components/FloatingPackButton.tsx
import { useEffect, useState } from "react";
import { usePackStore } from "@/store/packStore"; // or '@/features/pack/store'

export function FloatingPackButton({ count, onClick }: { count: number; onClick: () => void }) {
  const lastAdded = usePackStore((s) => s.lastAdded);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 1600); // show ~1.6s
    return () => clearTimeout(t);
  }, [lastAdded?.at]);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* hint bubble */}
      {showHint && lastAdded && (
        <div className="mb-2 mr-1 flex items-center gap-2 rounded-xl border bg-white/95 px-2 py-1 text-xs shadow-lg duration-200 animate-in fade-in zoom-in">
          {lastAdded.thumbnail ? (
            <img src={lastAdded.thumbnail} alt="" className="h-6 w-6 rounded-md object-cover" />
          ) : (
            <div className="h-6 w-6 rounded-md bg-gray-200" />
          )}
          <span className="max-w-[160px] truncate">Added: {lastAdded.name}</span>
          <span aria-hidden>✓</span>
        </div>
      )}

      {/* pulse ring when hint showing */}
      {showHint && (
        <span className="pointer-events-none absolute -inset-1 -z-10 animate-ping rounded-full bg-black/20" />
      )}

      <button
        onClick={onClick}
        aria-label="Open Pack"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-4 text-white shadow-lg hover:opacity-90 focus:outline-none"
      >
        <span aria-hidden>🧳</span>
        <span className="font-medium">شنطة السفر</span>
        {count > 0 && (
          <span className="ml-1 inline-flex min-w-6 justify-center rounded-full bg-white/90 px-2 text-sm font-semibold text-black">
            {count}
          </span>
        )}
      </button>
    </div>
  );
}

// // src/features/pack/components/FloatingPackButton.tsx
// import React from "react";

// export function FloatingPackButton({ count, onClick }: { count: number; onClick: () => void }) {
//   return (
//     <button
//       onClick={onClick}
//       aria-label="Open Pack"
//       className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-black px-4 text-white shadow-lg hover:opacity-90 focus:outline-none"
//     >
//       <span aria-hidden>🧳</span>
//       <span className="font-medium">شنطة السفر</span>
//       {count > 0 && (
//         <span className="ml-1 inline-flex min-w-6 justify-center rounded-full bg-white/90 px-2 text-sm font-semibold text-black">
//           {count}
//         </span>
//       )}
//     </button>
//   );
// }
