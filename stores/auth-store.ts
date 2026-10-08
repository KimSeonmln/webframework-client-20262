import { createStore } from "zustand/vanilla"
 
  export type AuthState = {
    accessToken: string | null
    setAccessToken: (token: string, expiresIn: number) => void
    restoreAccessToken: () => void
    clearAccessToken: () => void
  }
 
  const COOKIE_NAME = "accessToken"
 
  function cookieOptions() {
    const secure = window.location.protocol === "https:" ? "; Secure" : ""
    return `Path=/; SameSite=Lax${secure}`
  }
 
  export function createAuthStore() {
    return createStore<AuthState>()((set) => ({
      accessToken: null,
 
      setAccessToken: (token, expiresIn) => {
        document.cookie =
          `${COOKIE_NAME}=${encodeURIComponent(token)}; ` +
          `Max-Age=${Math.max(0, Math.floor(expiresIn))}; ${cookieOptions()}`
 
        set({ accessToken: token })
      },
 
      restoreAccessToken: () => {
        const cookie = document.cookie
          .split(";")
          .map((item) => item.trim())
          .find((item) => item.startsWith(`${COOKIE_NAME}=`))
 
        const token = cookie
          ? decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1))
          : null
 
        set({ accessToken: token })
      },
 
      clearAccessToken: () => {
        document.cookie =
          `${COOKIE_NAME}=; Max-Age=0; ${cookieOptions()}`
 
        set({ accessToken: null })
      },
    }))
  }