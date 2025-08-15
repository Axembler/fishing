import { create } from 'zustand' 
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useTimeStore = create(persist(immer((set, get) => {
  const storedTime = localStorage.getItem('timeStore')
  const initialTime = storedTime ? parseInt(storedTime, 10) : 0

  return {
   time: initialTime,
   timerId: null,

   startTimer: () => {
    if (get().timerId) {
     clearInterval(get().timerId)
    }

    const id = setInterval(() => {
     set(state => {
      if (state.time >= 1439) {
       state.time = 0
      } else {
       state.time += 1
      }
     })
    }, 1000)

    set({ timerId: id })
   },
  }
 }), { name: 'timeStore' })
)

export const timeStore = () => useTimeStore.getState()

export default useTimeStore
