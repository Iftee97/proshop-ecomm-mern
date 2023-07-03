import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>
              <span className='me-1'>
                &copy; {currentYear}
              </span>
              <Link
                to='/'
                style={{
                  textDecoration: 'none',
                  color: '#333'
                }}
              >
                ProShop
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
