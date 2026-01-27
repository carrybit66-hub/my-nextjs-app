"use client";

import { useTransition } from "react";
import { updateTaskTitle } from "@/app/dashboard/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";

export function TaskTitleEdit({ taskId, title }: { taskId: number; title: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          const res = await updateTaskTitle(fd);
          if (res.ok) toast({ title: res.message });
          else toast({ title: "保存に失敗", description: res.message });
        });
      }}
      className="flex w-full gap-2 sm:w-auto"
    >
      <input type="hidden" name="id" value={taskId} />
      <Input name="title" defaultValue={title} className="w-full sm:w-80" disabled={isPending} />
      <Button type="submit" variant="outline" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
