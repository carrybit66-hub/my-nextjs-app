"use client";

import { useState, useTransition } from "react";
import { deleteTask } from "@/app/dashboard/tasks/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toaster";

export function TaskDeleteDialog({ taskId, title }: { taskId: number; title: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onDelete = () => {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", String(taskId));

      const res = await deleteTask(fd);
      if (res.ok) {
        toast({ title: res.message });
        setOpen(false);
      } else {
        toast({ title: "削除に失敗", description: res.message });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>削除しますか？</DialogTitle>
          <DialogDescription>
            この操作は取り消せません。
            <br />
            <span className="font-medium text-foreground">「{title}」</span> を削除します。
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
