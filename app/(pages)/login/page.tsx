"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitEvent, useState } from "react"
import { useAuthStore } from "@/providers/auth-store-provider"
import { AuthState } from "@/stores/auth-store"

type LoginResponse = {
    accessToken : string
    tokenType : string
    expiresIn : number
}

export default function LoginPage() {

    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")
    
    const accessToken = useAuthStore((state) => state.accessToken)
    const setAccessToken = useAuthStore((state) => state.setAccessToken)
    const clearAccessToken = useAuthStore((state) => state.clearAccessToken)

    // const { accessToken, setAccessToken, clearAccessToken } = useAuthStore<AuthState>((state) => state)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const form = event.currentTarget
        const formData = new FormData(form)

        const email = formData.get("email") ?? "" // email이 false일때(값이 없거나 오류) 빈값 처리 (에러 처리)
        const password = formData.get("password") ?? "" 

        setIsSubmitting(true) 
        setErrorMessage("")
        clearAccessToken()

        try {
            const response = await fetch("http://localhost:8080/user-account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password}), // javascript object notation
            });

            if (!response.ok) {
                setErrorMessage(`로그인에 실패하였습니다. ${response.status}`)
                return
            }

            const data: LoginResponse = await response.json()
            setAccessToken(data.accessToken, data.expiresIn)
            form.reset()
        }
        catch {
            setErrorMessage("에러가 발생하였습니다.")
        }
        finally {
            setIsSubmitting(false) // 제출 후 제출 상태 false
        }

    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle> 로그인 </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email"> 이메일 </Label> 
                            <Input id="email" name="email" type="email" placeholder="example@email.com" autoComplete="email" required disabled={isSubmitting} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password"> 비밀번호 </Label>
                            <Input className="border-1" id="password" name="password" type="password" required disabled={isSubmitting} />
                        </div>

                        {errorMessage && (
                            <p className="text-sm text-red-600"> {errorMessage} </p>
                        )}

                        {accessToken && (
                            <p className="text-sm text-green-700">
                                로그인 성공! {accessToken}
                            </p>
                        )}

                        <Button className="w-full" type="submit" disabled={isSubmitting}> 로그인 </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}