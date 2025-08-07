import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Modal, Alert } from "react-bootstrap";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Product not found.");
        }
      } catch {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted successfully!");
      navigate("/products");
    } catch {
      alert("Failed to delete product.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="mt-5" style={{ paddingTop: "60px" }}>
      {showAlert && (
        <Alert variant="success" className="text-center">
          ✅ {product.title} has been added to your cart!
        </Alert>
      )}
      <Card
        className="shadow-sm product-details-card"
        style={{ maxWidth: "500px", margin: "auto", marginTop: "30px" }}
      >
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
            <Button variant="dark" className="me-2" onClick={handleAddToCart}>
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

