import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
