import { FC } from 'react'

interface PaginationProps {
  totalCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  currentPage,
}) => {
  const arrOfPages = new Array(totalCount).fill(null)
  return (
    <div className="btn-group flex justify-center">
      {arrOfPages.map((_, page) => {
        return (
          <button
            className={currentPage === page + 1 ? 'btn btn-active' : 'btn'}
            onClick={() => {
              if (currentPage !== page + 1) {
                onPageChange(page + 1)
              }
            }}
          >
            {page + 1}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
