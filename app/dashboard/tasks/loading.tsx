import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-52" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
          <CardDescription>Loading form...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-20" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>List</CardTitle>
          <CardDescription>Loading tasks...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full gap-2 sm:w-auto">
                  <Skeleton className="h-10 w-full sm:w-80" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
