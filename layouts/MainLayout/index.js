"use client"

import styles from "./mainLayout.module.sass"
import { getExp } from "@/api/exp"
import { useUser } from "@/app/providers/userContext"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { getCash } from "@/api/cash"
import useTimeStore from "@/store/useTimeStore"
import { getInventoryLures } from "@/api/lures"

export default function Main({ children, disabled, setLure }) {
  const { user, setUser } = useUser()

  const { time, startTimer } = useTimeStore(state => state)
  
  const [selectedLure, setSelectedLure] = useState('')

  const { data: expData } = useQuery({
    queryKey: ['expQuery'],
    queryFn: () => getExp('test'),
    refetchOnWindowFocus: false
  })

  const { data: cashData } = useQuery({
    queryKey: ['cashQuery'],
    queryFn: getCash,
    refetchOnWindowFocus: false
  })

  const { data: luresData } = useQuery({
    queryKey: ['luresUserQuery'],
    queryFn: getInventoryLures,
    refetchOnWindowFocus: false
  })

  const onSelectLure = lure => {
    if (!disabled) {
      setLure(lure)
  
      setSelectedLure(lure)
    }
  }

  useEffect(() => {
    const match = document.cookie.match(/(^|;)s*token=([^;]+)/)
    
    if (match && match[2]) {
      try {
        const decodedJwt = jwt.decode(match[2])
        
        setUser(decodedJwt)
      } catch (error) {
        console.error('Ошибка декодирования JWT:', error)
      }
    } else {
      console.warn('Токен не найден в cookie')
    }
  }, [])

  useEffect(() => {
    startTimer()
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div> Уровень: {Math.floor(expData?.exp / 10000)} </div>
        <div> Деньги: ${cashData?.cash.toFixed(2)} </div>
        <div> {String(Math.floor(time / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')} </div>
        <div> {user?.username} </div>
      </header>

      {children}

      <footer className={styles.footer}>
        {luresData && Object.entries(luresData).map(([lure, quantity]) => (
            <button 
                key={lure} 
                className={styles.lure} 
                style={{ backgroundColor: selectedLure === lure ? '#c9c9c9' : undefined }} 
                onClick={() => onSelectLure(lure)}
            >
                {lure} {quantity}
            </button>
        ))}
    </footer>
    </div>
  );
}
