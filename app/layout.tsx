import "./globals.css";
import { ToasterProvider } from "@/components/ui/toaster";

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark") document.documentElement.classList.add("dark");
    if (t === "light") document.documentElement.classList.remove("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ToasterProvider>{children}</ToasterProvider>
      </body>
    </html>
  );
}
