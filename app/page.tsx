"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/providers/auth-store-provider";
import Link from "next/link";

export default function Home() {
    const accessToken = useAuthStore((state) => state.accessToken)
    const clearAccessToken = useAuthStore((state) => state.clearAccessToken)
    return (
        <main className="flex min-h-screen items-center justify-center">
            {
                accessToken 
                ?
                <Button onClick={() => clearAccessToken()}> 로그아웃 </Button>
                :
                <Link href={"/login"}>
                    <Button> 로그인 </Button>
                </Link>
            }
            <Link href={"/signup"}>
                <Button> 회원가입 </Button>
            </Link>
            
        </main>
    );
}