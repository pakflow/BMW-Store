const ProductProfileLoading = () => {
  return (
    <div className="p-24 grid grid-cols-2 animate-pulse">
      <div className="w-full h-80 rounded-xl bg-gray-700"></div>
      <div className="product_descriptions mx-24">
        <div className="my-8 w-64 h-12 rounded-xl bg-gray-700"></div>
        <div className="my-4 w-32 h-6 rounded-xl bg-gray-700"></div>
        <div></div>
        <div className="my-4 w-32 h-6 rounded-xl bg-gray-700"></div>
        <div className="my-4 w-32 h-6 rounded-xl bg-gray-700"></div>
        <div className="my-4 w-74 h-48 rounded-xl bg-gray-700"></div>
        <div className="rating my-4 w-24 h-10 rounded-xl bg-gray-700"></div>
        <button className="block my-4 w-14 h-10 rounded-xl btn"></button>
      </div>
    </div>
  )
}

export default ProductProfileLoading
