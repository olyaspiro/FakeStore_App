import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="full-page-center">
      <div>
        <h1 className="mb-4">Welcome to our Fashion & Electronics Store</h1>
        <Button variant="dark" size="lg" onClick={() => navigate('/products')}>
          SHOP NOW
        </Button>
      </div>
    </div>
  );
}


export default Home;
