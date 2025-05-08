import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Modal } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch product details.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} has been added to your cart!`);
    navigate("/products");
  };

  const handleDelete = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        alert("Product deleted successfully!");
        navigate("/products");
      })
      .catch(() => {
        alert("Failed to delete product.");
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="mt-5" style={{ paddingTop: "60px" }}>
      <Card className="shadow-sm product-details-card" style={{ maxWidth: "500px", margin: "auto", marginTop: "30px" }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ maxHeight: "300px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {product.description}
          </Card.Text>
          <Card.Text>
            <strong>Category:</strong> {product.category}
          </Card.Text>

          <div className="d-flex justify-content-center">
            <Button variant="success" className="me-2" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="danger" onClick={handleShowModal}>
              Delete Product
            </Button>
          </div>

          <Link to={`/products/${id}/edit`} className="mt-3 d-block text-center">
            <Button variant="warning">Edit Product</Button>
          </Link>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
              handleCloseModal();
            }}
          >
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;
