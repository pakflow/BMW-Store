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
        id="my-modal-3"
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box relative w-[364px] h-[465px]">
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
