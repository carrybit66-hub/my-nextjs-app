// components/forms/AuthSubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  pendingLabel?: string;
};

export default function AuthSubmitButton({ label, pendingLabel = "処理中..." }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        "w-full rounded-xl font-medium text-white",
        "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60",
        "h-12 sm:h-10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
