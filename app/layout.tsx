import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { AuthStoreProvider } from "@/providers/auth-store-provider";

export const metadata: Metadata = {
  title: "웹 프레임워크 실습",
  description: "회원가입과 로그인 실습",
};

export default function RootLayout(
  { children }: Readonly<{children : ReactNode}>
) {
  return (
    <html lang="ko">
      <body>
        <AuthStoreProvider>
          {children}
        </AuthStoreProvider>
      </body>
    </html>
  );
}
