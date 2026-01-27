"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({ className, ...props }: ToastPrimitive.ToastViewportProps) => (
  <ToastPrimitive.Viewport
    className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:right-0 sm:top-0 sm:w-96", className)}
    {...props}
  />
);

export const Toast = ToastPrimitive.Root;
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;

export function SimpleToast({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <Toast open={open} onOpenChange={onOpenChange} className="rounded-lg border bg-card p-4 shadow">
      <div className="grid gap-1">
        <ToastTitle className="text-sm font-semibold">{title}</ToastTitle>
        {description ? <ToastDescription className="text-sm text-muted-foreground">{description}</ToastDescription> : null}
      </div>
      <ToastClose className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs hover:bg-accent">×</ToastClose>
    </Toast>
  );
}
