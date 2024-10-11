// dashboardapp/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Dashboard App',
  description: 'A simple dashboard app for products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
