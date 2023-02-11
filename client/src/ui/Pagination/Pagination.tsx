import { FC } from 'react'

const Pagination: FC = () => {
  return (
    <div className="btn-group flex justify-center">
      <button className="btn btn-ghost">1</button>
      <button className="btn btn-active">2</button>
      <button className="btn btn-ghost">3</button>
      <button className="btn btn-ghost">4</button>
    </div>
  )
}

export default Pagination
