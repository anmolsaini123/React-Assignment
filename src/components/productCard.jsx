function ProductCard({ data, addToCart }) {
  return (
    <div className="card">
      <img src={data.image} alt={data.title} />
      <h3>
        {data.title.length > 20
          ? data.title.slice(0, 20) + " ..."
          : data.title + " ..."}
      </h3>
      <p>${data.price}</p>
      <button onClick={() => addToCart(data)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;