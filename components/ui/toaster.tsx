"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { SimpleToast, ToastProvider, ToastViewport } from "@/components/ui/toast";

type ToastState = { title: string; description?: string };

const ToastCtx = createContext<{ toast: (t: ToastState) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToasterProvider />");
  return ctx;
}

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<ToastState>({ title: "" });

  const api = useMemo(
    () => ({
      toast: (t: ToastState) => {
        setPayload(t);
        setOpen(false);
        // 次tickで開く（連続発火に強くする）
        setTimeout(() => setOpen(true), 0);
      },
    }),
    []
  );

  return (
    <ToastCtx.Provider value={api}>
      <ToastProvider swipeDirection="right">
        {children}
        <SimpleToast open={open} onOpenChange={setOpen} title={payload.title} description={payload.description} />
        <ToastViewport />
      </ToastProvider>
    </ToastCtx.Provider>
  );
}
