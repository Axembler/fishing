import styles from "./modal.module.sass"
import { useModal } from "@/app/providers/modalContext"

export default function Modal({ modal, hideModal, hideAllModals }) {
  const { showModal } = useModal()

  const close = () => {
    if (modal.confirmClose) {
      showModal({
        caption: modal.caption,

        content: (
          <div>
            <span className={styles.info}>
              Вы уверены, что хотите закрыть это окно?
            </span>
          </div>
        ),
      })
    } else {
      hideModal()
    }
  }

  if (!modal) return null

  return (
    <div className={styles.container}>
      <div className={styles.modalOverlay} onClick={close} />

      <div className={styles.modal}>
        <div className={styles.form}>
          <div className={styles.header}>
            <span className={styles.caption}>{modal.caption}</span>
          </div>

          <div className={styles.content}>
            {modal.info ? (
              <span className={styles.info}>{modal.info}</span>
            ) : null}

            {modal.content}
          </div>
        </div>
      </div>
    </div>
  )
}
