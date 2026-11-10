import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { ToastProvider } from "@/components/ui/Toast";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "Adivyon Digital",
  description: "Digital agency providing web development, marketing, and strategy.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Adivyon Digital',
    description: 'Digital agency providing web development, marketing, and strategy.',
    images: [{ url: '/og-icon.png', width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <ToastProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  );
}
