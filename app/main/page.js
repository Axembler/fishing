"use client"

import styles from "./main.module.sass"
import { getFish } from "@/api/fish"
import { getLures } from "@/api/lures"
import { handleIncreaseExp } from "@/api/exp"
import { getRandomFish, getRandomWeight } from "@/helpers/functions"
import { useQuery } from "@tanstack/react-query"
import { useModal } from "../providers/modalContext"

let lure = 'worm'

export default function Main() {
  const modal = useModal()

  const fishQuery = useQuery({
    queryKey: ['fishQuery'],
    queryFn: getFish,
  })
  const luresQuery = useQuery({
    queryKey: ['luresQuery'],
    queryFn: getLures,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    
    
    const fish = getRandomFish(lure, fishQuery.data, luresQuery.data)

    if (fish) {
      const randomWeight = getRandomWeight(fish.weight)

      handleIncreaseExp('test', Math.ceil(randomWeight * fish.rate * 10))

      modal.showModal({
        caption: "Поздравляю!!!",
        content: (
          <div>
            <span>
              Вы выловили {fish.name} весом {randomWeight} кг
            </span>
          </div>
        ),
      })
  
      console.log(
        'рыба:', fish.name,
        'вес:', randomWeight,
        'опыт:', Math.ceil((randomWeight * fish.rate * 10))
      )
    }
  }

  return (
    <div className={styles.page} style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <main className={styles.main}>
        <button onClick={handleSubmit}>
          Нажать
        </button>
      </main>
    </div>
  );
}
