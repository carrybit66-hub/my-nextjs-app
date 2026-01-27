"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase-server";
import {
  createTaskSchema,
  deleteTaskSchema,
  toggleTaskDoneSchema,
  updateTaskTitleSchema,
} from "@/lib/validation";

type ActionResult = { ok: boolean; message: string };

export async function createTask(formData: FormData): Promise<ActionResult> {
  const parsed = createTaskSchema.safeParse({
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "入力が不正です" };
  }

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, message: "認証が必要です" };

  const { error } = await supabase.from("tasks").insert({
    user_id: user.id,
    title: parsed.data.title,
    is_done: false,
  });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/tasks");
  return { ok: true, message: "追加しました" };
}

export async function toggleTaskDone(formData: FormData): Promise<void> {
  const parsed = toggleTaskDoneSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) return;

  const { id } = parsed.data;

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: task, error: fetchError } = await supabase
    .from("tasks")
    .select("id, is_done")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !task) return;

  const { error: updateError } = await supabase
    .from("tasks")
    .update({ is_done: !task.is_done })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) return;

  revalidatePath("/dashboard/tasks");
}

export async function updateTaskTitle(formData: FormData): Promise<ActionResult> {
  const parsed = updateTaskTitleSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "入力が不正です" };
  }

  const { id, title } = parsed.data;

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "認証が必要です" };

  const { error } = await supabase
    .from("tasks")
    .update({ title })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/tasks");
  return { ok: true, message: "保存しました" };
}

export async function deleteTask(formData: FormData): Promise<ActionResult> {
  const parsed = deleteTaskSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) return { ok: false, message: "削除対象が不正です" };

  const { id } = parsed.data;

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "認証が必要です" };

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/tasks");
  return { ok: true, message: "削除しました" };
}
