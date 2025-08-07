import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Button, Spinner, Alert, Container, Form } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Form fields state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Fetch product by id on mount
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct(data);
          setTitle(data.title || "");
          setPrice(data.price || "");
          setDescription(data.description || "");
          setCategory(data.category || "");
          setImage(data.image || "");
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Handle form submission - update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    // Basic validation
    if (!title || !price || !description || !category) {
      setError("Please fill in all required fields.");
      setSaving(false);
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      setSaving(false);
      return;
    }

    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        title,
        price: Number(price),
        description,
        category,
        image,
      });
      setMessage("Product updated successfully!");
    } catch (err) {
      setError("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted.");
      navigate("/products"); // go back to product list after deletion
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  if (loading) return <Spinner animation="border" className="m-4" />;

  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <Container style={{ maxWidth: "600px", marginTop: "40px" }}>
      <h2 className="mb-4">Edit Product</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category *</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="dark" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Product"}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EditProduct;
