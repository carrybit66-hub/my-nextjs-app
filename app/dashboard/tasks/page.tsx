import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabase-server";
import { TaskCreateForm } from "@/components/task-create-form";
import { toggleTaskDone } from "@/app/dashboard/tasks/actions";
import { TaskDeleteDialog } from "@/components/task-delete-dialog";
import { TaskTitleEdit } from "@/components/task-title-edit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Task = {
  id: number;
  title: string;
  is_done: boolean;
  created_at: string;
};

export default async function TasksPage() {
  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="rounded-md border bg-white p-4">
        <p className="text-sm">Not authenticated.</p>
        <Link className="text-sm underline" href="/login">
          Go to login
        </Link>
      </div>
    );
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, is_done, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Task[]>();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Failed to load tasks</CardTitle>
          <CardDescription className="text-red-600">{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-lg font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">CRUD + zod validation</p>
        </div>

        <Link href="/dashboard">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <TaskCreateForm />

      <Card>
        <CardHeader>
          <CardTitle>List</CardTitle>
          <CardDescription>あなたのタスク一覧</CardDescription>
        </CardHeader>
        <CardContent>
          {(!tasks || tasks.length === 0) && (
            <div className="py-6 text-sm text-muted-foreground">No tasks yet.</div>
          )}

          {tasks && tasks.length > 0 && (
            <ul className="divide-y">
              {tasks.map((t) => (
                <li key={t.id} className="py-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <form action={toggleTaskDone}>
                        <input type="hidden" name="id" value={t.id} />
                        <Button type="submit" variant="secondary">
                          {t.is_done ? "✅ Done" : "Mark done"}
                        </Button>
                      </form>

                      <div className="text-xs text-muted-foreground">
                        {new Date(t.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <TaskTitleEdit taskId={t.id} title={t.title} />
                      <div className="self-start sm:self-auto">
                        <TaskDeleteDialog taskId={t.id} title={t.title} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
