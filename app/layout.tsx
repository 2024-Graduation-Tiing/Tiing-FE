import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './Header';
import React from 'react';
import QueryProvider from '@/app/lib/queryProvider';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'Tiing',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <QueryProvider>
          <Header />
          <div>{auth}</div>
          <div id="children-container">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
