"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard error</CardTitle>
        <CardDescription>ダッシュボードでエラーが発生しました</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <pre className="whitespace-pre-wrap rounded-md border bg-muted p-3 text-xs">
          {error.message}
        </pre>

        <div className="flex flex-wrap gap-2">
          <Button onClick={reset}>Retry</Button>
          <Link href="/login">
            <Button variant="outline">Go to Login</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
