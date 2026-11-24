import { getProducts, updateProduct } from "../api/api"
import type { Product } from "../types/product"

function Moderator({ products, setProducts }:
  { products: Product[], setProducts: (products: Product[]) => void }) {



  async function handleChangeActive(product: Product){
    if (!confirm("Biztosan szeretne megvaltoztatni " + product.name + " aktivsagat?")) {
      return
    }
    try {
      await updateProduct(product.id, {
        active: !product.active
      })

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function increasePrice(product: Product){
    if (!confirm("Biztosan szeretne novelni " + product.name + " arat?")) {
      return
    }
    try {
      await updateProduct(product.id, {
        price: product.price + 1000
      })

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function decreasePrice(product: Product){
    if (!confirm("Biztosan szeretne csokkenteni " + product.name + " arat?")) {
      return
    }
    try {
      await updateProduct(product.id, {
        price: product.price - 1000
      })

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <h1>Moderator</h1>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>date</th>
          <th>active</th>
          <th>Operaciok</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.date}</td>
            <td>{product.active ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => handleChangeActive(product)}>
                Aktiv allitasa
              </button>
              <button
                className="btn btn-success btn-sm mx-1"
                onClick={() => increasePrice(product)}>+</button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => decreasePrice(product)}>-</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}
export default Moderator
