"use client"
// auth store를 하위 컴포넌트에 전달하고, useAuthStore()는 그 저장소에서 필요한 값을 읽는 함수
 
import { AuthState, createAuthStore } from "@/stores/auth-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";
 
type AuthStore = ReturnType<typeof createAuthStore>
const AuthStoreContext = createContext<AuthStore | null>(null)
 
export function AuthStoreProvider({
  children  
}: { children: ReactNode }) {
  // Provider가 유지되는 동안 같은 저장소를 사용
  const [store] = useState(() => createAuthStore())
 
  useEffect(() => {
    store.getState().restoreAccessToken()
  }, [ store ])
 
  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  )
}
 
export function useAuthStore<T>(
  selector: (state: AuthState) => T
): T {
  const store = useContext(AuthStoreContext)
 
  if (!store) {
    throw new Error("useAuthStore는 AuthStorePovider 안에서 사용해야 합니다.")
  }
 
  return useStore(store, selector)
}