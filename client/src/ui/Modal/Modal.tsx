import { FC, PropsWithChildren } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
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
        id="my-modal-5"
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box relative w-[364px] h-[465px] w-4/6 h-full">
          <label
            htmlFor="my-modal-5"
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
