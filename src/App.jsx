// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct"; 
import EditProduct from "./components/EditProduct";
import NavBar from "./components/NavBar";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>
      </main>
      <footer>© 2025 My Store</footer>
    </Router>
  );
}

export default App;


