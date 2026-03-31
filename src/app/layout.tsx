import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Standout Founder',
  description: 'We help founders and startup leaders position themselves as industry authorities through strategic content—without the overwhelm.',
  openGraph: {
    title: 'The Standout Founder',
    description: 'Turn Your Vision Into Influence.',
    url: 'https://www.thestandoutfounder.com',
    siteName: 'The Standout Founder',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
