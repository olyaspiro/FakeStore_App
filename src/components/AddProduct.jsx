import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
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

    const newProduct = {
      title,
      price,
      description,
      category,
      image,
    };

    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then(() => {
        setSuccessMessage("Product created successfully!");
        setLoading(false);
        setTimeout(() => navigate("/products"), 2000);
      })
      .catch(() => {
        setError("Failed to create product.");
        setLoading(false);
      });
  };

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Add Product</h2>

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
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
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

        <div className="d-flex justify-content-center">
          <Button variant="dark" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProduct;
