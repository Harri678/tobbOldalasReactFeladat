import type { ReactFormState } from "react-dom/client"
import { addProduct, deleteProduct, getProducts, updateProduct } from "../api/api"
import type { Product } from "../types/product"
import { useState } from "react"

function Admin({ products, setProducts }:
  { products: Product[], setProducts: (products: Product[]) => void }) {

    const [name, setName] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [date, setDate] = useState("")
    const [active, setActive] = useState(true)


    async function handleAdd(e: React.FormEvent) {
      e.preventDefault()

      if (name === "" || price <= 0 || date === "") {
        alert("Minden mezőt töltsön ki!")
        return
      }

      try {
        await addProduct({
          name,
          price,
          date,
          active
        })

        const data = await getProducts()
        setProducts(data)

        setName("")
        setPrice(0)
        setDate("")
        setActive(true)

      } catch (err) {
        console.log(err)
      }
    }
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

  async function handleDelete(product: Product){
    if (!confirm("Biztosan szeretne torolni " + product.name + " -t?")) {
      return
    }
    try {
      await deleteProduct(product.id)

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <h1>Admin</h1>
    <h3>Új termék hozzáadása</h3>

    <form onSubmit={handleAdd} className="mb-4">

      <div className="mb-2">
        <label>Termék neve:</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Ár:</label>
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="mb-2">
        <label>Dátum:</label>
        <input
          className="form-control"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <label className="form-check-label">Aktív</label>
      </div>

      <button className="btn btn-success" type="submit">
        Termék hozzáadása
      </button>

    </form>

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
                onClick={() => increasePrice(product)}>+</button>

              <button
                onClick={() => decreasePrice(product)}>-</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}
export default Admin
