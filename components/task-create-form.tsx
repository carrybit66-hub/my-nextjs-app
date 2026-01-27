"use client";

import { useRef, useTransition } from "react";
import { createTask } from "@/app/dashboard/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";

export function TaskCreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">Add Task</div>

      <form
        ref={formRef}
        action={(formData) => {
          startTransition(async () => {
            const res = await createTask(formData);
            if (res.ok) {
              formRef.current?.reset();
              toast({ title: "追加しました" });
            } else {
              toast({ title: "追加に失敗", description: res.message });
            }
          });
        }}
        className="mt-3 flex gap-2"
      >
        <Input name="title" placeholder="例: 仕様確認する" disabled={isPending} autoComplete="off" />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
}
