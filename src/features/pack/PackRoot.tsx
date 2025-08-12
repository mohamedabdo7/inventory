// src/features/pack/PackRoot.tsx
import React, { useState } from "react";
import { FloatingPackButton } from "./components/FloatingPackButton";
import { PackDrawer } from "./components/PackDrawer";
import { usePackStore } from "@/store/packStore";

export function PackRoot({ categoryNameOf }: { categoryNameOf?: (id?: string) => string }) {
  const [open, setOpen] = useState(false);
  const itemCount = usePackStore((s) => s.itemCount);

  return (
    <>
      <FloatingPackButton count={itemCount} onClick={() => setOpen(true)} />
      <PackDrawer open={open} onClose={() => setOpen(false)} categoryNameOf={categoryNameOf} />
    </>
  );
}
