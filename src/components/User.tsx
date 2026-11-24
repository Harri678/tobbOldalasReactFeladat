import type { Product } from "../types/product"

function User({products}: {products: Product[]}) {

  return <>
    <h1>User</h1>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>date</th>
          <th>active</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  </>
}

export default User
