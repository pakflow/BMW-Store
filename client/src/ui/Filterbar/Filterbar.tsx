// import { ProductEntity } from 'entities/ProductEntity'
import { CategoryEntity } from 'entities/CategoryEntity'
import { FC } from 'react'

interface FilterbarProps {
  price: string
  handlePrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  year: string
  handleYear: (e: React.ChangeEvent<HTMLInputElement>) => void
  engine: CategoryEntity[]
  handleEngine: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleCapacity: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

// props
const Filterbar: FC<FilterbarProps> = ({
  price,
  handlePrice,
  year,
  handleYear,
  engine,
  handleEngine,
  handleCapacity,
}) => {
  return (
    <div className="w-1/6 bg-slate-300 rounded-lg mr-2 p-4">
      <div className="filter-header">Filtered by</div>
      {/* price */}

      <div className="filter-price">price</div>
      <label className="label">
        <span className="label-text-alt">6000</span>
        <span className="label-text-alt">120000</span>
      </label>
      <input
        type="range"
        min="6000"
        max="120000"
        value={price}
        className="range"
        onInput={handlePrice}
      />
      {/* car year */}
      <div className="filter-manufacture">year of manufacture</div>
      <label className="label">
        <span className="label-text-alt">2012</span>
        <span className="label-text-alt">2023</span>
      </label>
      <input
        type="range"
        min="2012"
        max="2023"
        value={year}
        className="range"
        onInput={handleYear}
      />
      {/* engine */}
      <form>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">engine</span>
          </label>
          <select className="select select-bordered" onSelect={handleEngine}>
            <option disabled selected>
              choose one
            </option>
            {engine.map((data) => (
              <option>{data.category}</option>
            ))}
          </select>
        </div>
      </form>
      {/* engine capacity */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">engine capacity</span>
        </label>
        <select className="select select-bordered" onSelect={handleCapacity}>
          <option disabled selected>
            choose one
          </option>
          <option>2</option>
          <option>2.5</option>
          <option>2.8</option>
          <option>3.5</option>
        </select>
      </div>
    </div>
  )
}

export default Filterbar
