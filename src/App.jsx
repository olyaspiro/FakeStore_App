import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Register from "./pages/Register";    
import Login from "./pages/Login";           
import Profile from "./pages/Profile";          
import NavigationBar from "./components/NavBar";
import CartPage from "./pages/CartPage";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <footer>© 2025 My Store</footer>
    </Router>
  );
}

export default App;
