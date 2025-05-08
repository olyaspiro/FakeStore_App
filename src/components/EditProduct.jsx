import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        const product = res.data;
        setTitle(product.title);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setImage(product.image || "");
        setLoadingData(false);
      })
      .catch(() => {
        setError("Failed to load product data.");
        setLoadingData(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !description || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const updatedProduct = {
      title,
      price,
      description,
      category,
    };

    axios
      .put(`https://fakestoreapi.com/products/${id}`, updatedProduct)
      .then(() => {
        setSuccessMessage("Product updated successfully!");
        setLoading(false);
        setTimeout(() => navigate(`/products/${id}`), 2000);
      })
      .catch(() => {
        setError("Failed to update product.");
        setLoading(false);
      });
  };

  if (loadingData) return <p>Loading product data...</p>;

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Edit Product</h2>

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
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditProduct;
