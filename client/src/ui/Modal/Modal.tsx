import { FC, PropsWithChildren } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
  content?: JSX.Element
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  children,
  onClose,
}) => {
  return (
    <div>
      <input
        checked={open}
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
