"use client"

import { buyLures, getLures } from "@/api/lures"
import styles from "./shop.module.sass"
import MainLayout from "@/layouts/MainLayout"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { translateLures } from "@/helpers/ru/lures"
import { decreaseCash } from "@/api/cash"
import { useState } from "react"

export default function Shop() {
  const queryClient = useQueryClient()
  const [isInvalidating, setIsInvalidating] = useState(false)

  const { data: lures, isLoading } = useQuery({
    queryKey: ['luresQuery'],
    queryFn: getLures,
    refetchOnWindowFocus: false
  })

  const onBuyLure = async lure => {
    setIsInvalidating(true)

    await buyLures(lure.name, 5)

    await decreaseCash(lure.price)

    await queryClient.invalidateQueries(['luresUserQuery'])

    setIsInvalidating(false)
  }

  if (isLoading) return 'Загрузка' 
  
  return (
    <MainLayout>
      <main className={styles.main}>
        {lures && lures.map((lure, index) => (
          <button key={index} className={styles.card} disabled={isInvalidating} onClick={() => onBuyLure(lure)}>
            <span className={styles.name}>
              {translateLures(lure.name)}
            </span>

            <span className={styles.price}>
              ${lure.price}
            </span>
          </button>
        ))}
      </main>
    </MainLayout>
  )
}
