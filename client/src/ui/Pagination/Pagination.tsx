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
  const arrOfPages = Array.from({ length: totalCount }, (_, k) => k + 1)
  return (
    <div className="btn-group flex justify-center">
      {arrOfPages.map((page) => {
        return (
          <button
            className={currentPage === page ? 'btn btn-active' : 'btn'}
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page)
              }
            }}
          >
            {page.toString()}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
