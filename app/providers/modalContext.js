import Modal from '@/components/Modal'
import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([])

  const hideModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1))
  }

  const hideModalN = (index) => {
    setModals((prevModals) => prevModals.filter((_, i) => i !== index))
  }

  const hideAllModals = () => {
    setModals([])
  }

  const showModal = (props) => {
    setModals((prevModals) => [
      ...prevModals,
      {
        caption: props?.caption,
        content: props?.content,
        sideBar: props?.sideBar,
        captionColor: props?.captionColor,
        textColor: props?.textColor,
        backgroundColor: props?.backgroundColor,
        type: props?.type,
        info: props?.info,
        func: props?.func,
        confirmClose: props?.confirmClose,
        isButtons: props?.isButtons,
      },
    ])
  }

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, hideAllModals, hideModalN }}
    >
      {modals.map((modal, index) => (
        <Modal
          key={index}
          modal={modal}
          hideModal={hideModal}
          hideAllModals={hideAllModals}
          hideModalN={hideModalN}
        />
      ))}
      {children}
    </ModalContext.Provider>
  )
}
