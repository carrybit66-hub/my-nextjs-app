// components/PageLayout.tsx
import * as React from "react";

type PageLayoutProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;

  className?: string;
  maxWidthClassName?: string;
};

export default function PageLayout({
  title,
  description,
  actions,
  children,
  className = "",
  maxWidthClassName = "max-w-6xl",
}: PageLayoutProps) {
  return (
    <div className={`w-full bg-white ${className}`}>
      {/* ヘッダー（sticky） */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className={`mx-auto w-full ${maxWidthClassName} px-4 sm:px-6 lg:px-8 py-4`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* タイトル */}
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 truncate">
                {title}
              </h1>

              {description ? (
                <p className="mt-1 text-sm text-gray-500">
                  {/* text-muted-foreground が無い場合は text-gray-500（このままでOK） */}
                  {description}
                </p>
              ) : null}
            </div>

            {/* actions */}
            {actions ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:flex-wrap">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 本文 */}
      <div className={`mx-auto w-full ${maxWidthClassName} px-4 sm:px-6 lg:px-8 py-6 sm:py-8`}>
        {children}
      </div>
    </div>
  );
}
