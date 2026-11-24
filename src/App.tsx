import { useEffect, useState } from 'react'
import './App.css'
import User from './components/User'
import Admin from './components/Admin'
import Moderator from './components/Moderator'
import { getProducts } from './api/api'
import type { Product } from './types/product'

function App() {
  const [oldal, setOldal] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts()
      setProducts(data)
    }
    loadProducts()
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className='nav-item'>
              <button className='btn btn-dark' onClick={()=> setOldal("user")}>User</button>
            </li>
            <li className='nav-item'>
              <button className='btn btn-dark' onClick={()=> setOldal("moderator")}>Moderator</button>
            </li>
            <li className='nav-item'>
              <button className='btn btn-dark' onClick={()=> setOldal("admin")}>Admin</button>
            </li>
          </ul>
        </div>
      </nav>

      {oldal === "user" && <User products={products} />}
      {oldal === "admin" && <Admin products={products}  setProducts={setProducts}/>}
      {oldal === "moderator" && <Moderator products={products}  setProducts={setProducts}/>}
    </>
  )
}

export default App
