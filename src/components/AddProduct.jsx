import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !category) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const newProduct = {
      title,
      price: Number(price),
      description,
      category,
      image,
    };

    try {
      await addDoc(collection(db, "products"), newProduct);
      setSuccessMessage("Product created successfully!");
      setLoading(false);
      setTimeout(() => navigate("/products"), 2000);
    } catch (err) {
      setError("Failed to create product: " + err.message);
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Add New Product</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter product title"
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price (e.g. 29.99)"
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter product description"
            />
          </Form.Group>

          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelry">Jewelry</option>
              <option value="electronics">Electronics</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formImage" className="mb-4">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL here (optional)"
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="dark" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AddProduct;
