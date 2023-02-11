import React from 'react'

const ProductCard = () => {
  return (
    <div className="card w-80 h-72 m-4 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://cosystatic.bmwgroup.com/bmwweb/cosySec?COSY-EU-100-2545xM4RIyFnbm9Mb3AgyyIJrjG0suyJRBODlsrjGpuaprQbhSIqppglBg3Rnvl384MlficYiGHqoQxYLW7%25f3tiJ0PCJirQbLDWcQW7%251uS39qoQh47wMvcYi9kQwVMb3islBglUbuJcRScHzwgMbnMdQVayJGy53SBrQ%25r9RpbW8zWubtJqogqaJ2zl3ilUQT9cRScH8ZgMbnMdoPdyJGy5BubrQ%25r9YbJW8zWuEfCqogqaFkal3ilU%25dzcRScHzoBMbnMdg30yJGy5iYarQ%25r9SEbW8zWunD4qogqaGR4l3ilU%25FjcRScHzjgMbnMdgsYyJGy5iKnrQ%25r9SMBW8zWunm7qogqaDHFl3ilUC7gcRScH4giMbnMdei0yJGy5msbrQ%25r9sRnW8zWuKbMqogqaDJTl3ilUCG8cRScH4%25gMbnMdezOyJGy5QsnrQ%25r98BYW8zWuob9qogqa3Jal3ilURQGcRScHbz1MbnMdJbkyJGy5Q4ErQ%25r98vSW8zWuuRHqogqaaRdl3ilUUHecRScHHwsMbnMddVHyJR0aWAyFnhiExyJR5GlJirjGNY3QcNQBUJ1"
          alt="bmw"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">BMW M2 Coupe</h2>
        <div className="card-actions justify-end">
          <button className="btn w-15">Buy</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
