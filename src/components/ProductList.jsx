import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCol = collection(db, "products");
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        setError("Failed to fetch products.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-danger text-center mt-3">{error}</p>
    );
  }

  return (
    <Container className="mt-5">
      {showPopup && (
        <Alert variant="success" className="text-center">
          ✅ Item added to cart!
        </Alert>
      )}
      <div
        style={{ marginTop: "60px" }}
        className="d-flex justify-content-center align-items-center mb-4"
      >
        <h1 className="mb-0">Our Collection</h1>
      </div>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-sm border-0 h-100 card-equal-height">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Link to={`/products/${product.id}`}>
                    <Button variant="secondary">View Details</Button>
                  </Link>
                  <Button
                    variant="dark"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
