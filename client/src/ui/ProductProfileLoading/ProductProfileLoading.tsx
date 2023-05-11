const ProductProfileLoading = () => {
  return (
    <div className="p-24 grid grid-cols-2 animate-pulse">
      <img src="" className="w-full" alt="" />
      <div className="product_descriptions mx-24">
        <p className="py-4 text-2xl font-bold"></p>
        <p className="py-2 font-semibold"></p>
        <p></p>
        <p className="py-2 font-semibold"></p>
        <p className="py-2 font-semibold"></p>
        <p className="py-2 font-semibold"></p>
        <div className="rating py-2">
          <input type="radio" name="rating-1" className="mask mask-star" />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star"
            checked
          />
          <input type="radio" name="rating-1" className="mask mask-star" />
          <input type="radio" name="rating-1" className="mask mask-star" />
          <input type="radio" name="rating-1" className="mask mask-star" />
        </div>
        <button className="block my-2 btn">Buy</button>
      </div>
    </div>
  )
}

export default ProductProfileLoading
