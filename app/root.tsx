import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
import { ModalProvider } from "./context/ModalContext";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScreenSizeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ScreenSizeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white text-2xl">Loading...</p>
    </div>
  );
}
