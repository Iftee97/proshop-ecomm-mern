import { Alert } from 'react-bootstrap'

export default function Message({ variant = 'info', children }) {
  return (
    <Alert variant={variant} style={{ textAlign: 'center' }}>
      <strong>{children}</strong>
    </Alert>
  )
}
