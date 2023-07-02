import { Container, Row, Col } from "react-bootstrap"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>&copy; {currentYear} ProShop</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
