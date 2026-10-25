import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "मेहंदी सेवाएँ | MehndiConnect",
  description: "मेहंदी डिज़ाइन और सेवाएँ देखें और अपनी पसंद चुनें।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
