import { z } from "zod";

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, "タイトルを入力してください")
  .max(100, "タイトルは100文字以内にしてください");

export const createTaskSchema = z.object({
  title: taskTitleSchema,
});

export const updateTaskTitleSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: taskTitleSchema,
});

export const toggleTaskDoneSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const deleteTaskSchema = z.object({
  id: z.coerce.number().int().positive(),
});
