"use client"

import styles from "./auth.module.sass"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/api/login"

export default function Auth() {
  const { push } = useRouter()

  const [state, action, isPending] = useActionState(auth)

  async function auth (prevState, newState) {
    const username = newState.get('username')
    const password = newState.get('password')

    if (!username || !password) {
        return
    }

    const { token } = await login(username, password)

    document.cookie = `token=${token}; max-age=604800`

    push('/main')
  }

  return (
    <form className={styles.page} action={action}>
      <h2>Пора на рыбалку</h2>

      <div className={styles.form}>
        <input
          type="text" 
          name="username"
          placeholder="Имя пользователя"
        />

        <input
          type="password" 
          name="password"
          placeholder="Пароль"
        />

        <button type="submit" disabled={isPending}>Войти</button>
      </div>
    </form>
  )
}
