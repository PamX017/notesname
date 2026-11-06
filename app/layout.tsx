import "./globals.css";

export const metadata = {
  title: "Name Melody",
  description: "Turn your name into music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}