"use client"

import styles from "./auth.module.sass"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/api/login"

export default function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { push } = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!username || !password) {
      return
    }

    try {
      const response = await login(username, password)
      
      const data = await response.json()

      if (response.ok) {
        document.cookie = `username=${username}; path=/; max-age=604800`
        
        push('/main')
      }

      console.log(data, response)
    } catch (error) {
      console.error("Ошибка при авторизации:", error)
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Авторизация</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Имя пользователя" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />

          <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <button type="submit">Войти</button>
        </form>
      </main>
    </div>
  )
}
