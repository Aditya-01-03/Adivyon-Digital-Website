import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"], variable: '--font-body' });
const manrope = Manrope({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: "Adivyon Digital",
  description: "Digital agency providing web development, marketing, and strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <ToastProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
