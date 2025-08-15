import { useModal } from "@/app/providers/modalContext"
import styles from "./modalCongratulation.module.sass"
import { increaseCash } from "@/api/cash"
import { increaseExp } from "@/api/exp"

export default function ModalCongratulation({ queryClient, exp, fish, weight }) {
    const { hideModal } = useModal()

    const sell = async () => {
        const cash = exp / 50

        await increaseCash(cash)

        queryClient.invalidateQueries(['cashQuery'])

        hideModal()
    }

    const drop = async () => {
        await increaseExp(exp)

        queryClient.invalidateQueries(['expQuery'])

        hideModal()
    }

    return (
        <div className={styles.modal}>
            <div>
                <span>
                    Вы выловили {fish.name}
                </span>

                <span>
                    {weight} кг
                </span>
            </div>

            <div>
                <span>
                    Вы получите ${exp / 50}
                </span>

                <span>
                    Вы получите {exp} опыта
                </span>
            </div>

            <footer className={styles.buttons}>
                <button className={styles.button} onClick={sell}>
                    Продать
                </button>

                <button className={styles.button} onClick={drop}>
                    Отпустить
                </button>
            </footer>
        </div>
    )
}
