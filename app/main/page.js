"use client"

import styles from "./main.module.sass"
import { getFish } from "@/api/fish"
import { increaseExp } from "@/api/exp"
import { getRandomFish, getRandomWeight } from "@/helpers/functions"
import MainLayout from "@/layouts/MainLayout"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useModal } from "../providers/modalContext"
import { useEffect, useState } from "react"
import ModalCongratulation from "@/widgets/ModalCongratulation"
import { decreaseLure, getLures } from "@/api/lures"

function getNumberBasedOnValue(value) {
  switch (value) {
      case 'worm':
          return 15;
      case 'corn':
          return 10;
      case 'bread':
          return 15;
      case 'baitfish':
          return 5;
  }
}

export default function Main() {
  const queryClient = useQueryClient()
  const modal = useModal()
  const [lure, setLure] = useState('')

  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [bites, setBites] = useState(false)

  const { data: fishData } = useQuery({
    queryKey: ['fishMainQuery'],
    queryFn: getFish,
    refetchOnWindowFocus: false
  })
  const { data: luresData } = useQuery({
    queryKey: ['luresMainQuery'],
    queryFn: getLures,
    refetchOnWindowFocus: false
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    setBites(false)

    const fish = getRandomFish(lure, fishData, luresData)

    if (fish) {
      const randomWeight = getRandomWeight(fish.weight)

      const exp = Math.ceil(randomWeight * fish.rate * 10)

      await increaseExp(exp)

      queryClient.invalidateQueries(['expQuery'])

      modal.showModal({
        caption: "Поздравляю!",
        content: (
          <ModalCongratulation queryClient={queryClient} exp={exp} fish={fish} weight={randomWeight} />
        )
      })
    }
  }

  const onClickHandler = async () => {
    if (lure) {
      await decreaseLure(lure)
      
      queryClient.invalidateQueries(['luresUserQuery'])
      
      startTimer()
    }
  }

  const startTimer = () => {
    setIsRunning(true)
    setTime(0)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  useEffect(() => {
    let timer

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1)

        const randomChance = Math.random() * 100
        if (randomChance < getNumberBasedOnValue(lure)) { // вероятность
          stopTimer()
          setBites(true)

          setTimeout(() => {
            setBites(false)
          }, 2000)
        }
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isRunning])

  return (
    <MainLayout setLure={setLure} disabled={isRunning || bites} queryClient={queryClient}>
      <main className={styles.main} style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {((isRunning && bites) ||  (!isRunning && !bites)) && <button onClick={onClickHandler}>
          Забросить удочку
        </button>}
        
        {bites && <button onClick={handleSubmit}>
          Подсечь
        </button>}
      </main>
    </MainLayout>
  )
}
