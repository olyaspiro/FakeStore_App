import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'lightgray', padding: '1rem 0', textAlign: 'center' }}>
      <Container>
        <p style={{ margin: 0, color: '#333' }}>© {new Date().getFullYear()} My Store. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
