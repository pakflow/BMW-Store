import React from 'react'
// props
const Filterbar = () => {
  return (
    <div className="w-1/6 bg-slate-300 rounded-lg mr-2 p-4">
      <div className="filter-header">Filtered by</div>
      {/* price */}

      <div className="filter-price">price</div>
      <label className="label">
        <span className="label-text-alt">6000</span>
        <span className="label-text-alt">120000</span>
      </label>
      <input type="range" min="0" max="100" value="40" className="range" />
      {/* car year */}
      <div className="filter-manufacture">year of manufacture</div>
      <label className="label">
        <span className="label-text-alt">2012</span>
        <span className="label-text-alt">2023</span>
      </label>
      <input type="range" min="0" max="100" value="40" className="range" />
      {/* engine */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">engine</span>
        </label>
        <select className="select select-bordered">
          <option disabled selected>
            choose one
          </option>
          <option>petrol</option>
          <option>hybrid</option>
          <option>electro</option>
          <option>diesel</option>
        </select>
      </div>
      {/* engine capacity */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">engine capacity</span>
        </label>
        <select className="select select-bordered">
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
